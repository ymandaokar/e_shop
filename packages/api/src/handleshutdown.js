const handler = require("shutdown-handler"),
  { ServerLogger } = require("./utility/logger.js");

module.exports = () =>
  handler.on("exit", e => {
    e.preventDefault();
    ServerLogger.warn(
      "Server shutting down...",
      { seriously: true },
      (err, level, msg, meta) => {
        process.exit(1);
      }
    );
  });
