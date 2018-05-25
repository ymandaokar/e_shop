var util = require("util");
var request = require("request");
var winston = require("winston");
var queue = require("./queue");
var q = queue({ concurrency: 1, autostart: true });

function Slack(config) {
  if (!config) throw new Error("Missing config");
  if (!config.webhook_url) throw new Error("Missing webhook_url in config");
  winston.Transport.call(this, config);

  this.config = config;

  this.handleExceptions = !!config.handleExceptions;
}

util.inherits(Slack, winston.Transport);

winston.transports.Slack = Slack;

ensureCallback = function(cb1, cb2) {
  return function() {
    try {
      cb1.apply(null, arguments);
    } finally {
      cb2();
    }
  };
};

deferredExecute = function(url, payload, callback) {
  return function(cb) {
    var safeCallback = ensureCallback(callback, cb);
    request
      .post(url)
      .json(payload)
      .on("response", function(response) {
        if (response.statusCode === 200) {
          safeCallback(null, true);
          return;
        }

        safeCallback("Server responded with " + response.statusCode);
      })
      .on("error", function(error) {
        safeCallback(error);
      });
  };
};

Slack.prototype.log = function(level, msg, meta, callback) {
  callback =
    callback ||
    function(err) {
      if (err) console.error(err.stack);
    };

  var message = this.config.custom_formatter
    ? this.config.custom_formatter(level, msg, meta)
    : { text: "*" + level + "* " + msg };

  var payload = {
    text: message.text,
    username: message.username || this.config.username,
    channel: message.channel || this.config.channel,
    icon_url: message.icon_url || this.config.icon_url,
    icon_emoji: message.icon_emoji || this.config.icon_emoji,
    attachments: message.attachments || this.config.attachments,
    unfurl_links: message.unfurl_links || this.config.unfurl_links,
    unfurl_media: message.unfurl_media || this.config.unfurl_media,
    link_names: message.link_names || this.config.link_names
  };

  q.push(
    deferredExecute(
      this.config.webhook_url,
      payload,
      function(err, res, body) {
        if (err) return callback(err);
        if (res.statusCode !== 200)
          return callback(
            new Error(
              "Unexpected status code from Slack API: " + res.statusCode
            )
          );
        this.emit("logged");
        callback(null, true);
      }.bind(this)
    )
  );
};

module.exports = Slack;
