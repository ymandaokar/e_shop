const fs = require("fs"),
  path = require("path"),
  _ = require("lodash"),
  { buildPath } = require("../appsettings.js"),
  StackTraceGPS = require("stacktrace-gps"),
  StackFrame = require("stackframe"),
  SourceMap = require("source-map"),
  StackTracer = {
    gps: null,
    getGPS: () => {
      if (this.gps) {
        return this.gps;
      }
      let readFileSync = file =>
        fs.readFileSync(path.resolve(__dirname, `../../${buildPath}/${file}`), {
          encoding: "UTF-8"
        }),
        files = fs.readdirSync(path.resolve(__dirname, `../../${buildPath}`)),
        sourceCache = _.filter(files, file =>
          _.endsWith(file, ".js")
        ).reduce((cache, file) => {
          cache[file] = readFileSync(file);
          return cache;
        }, {}),
        sourceMapConsumerCache = _.filter(files, file =>
          _.endsWith(file, ".js.map")
        ).reduce((cache, file) => {
          cache[file] = new SourceMap.SourceMapConsumer(readFileSync(file));
          return cache;
        }, {});
      this.gps = new StackTraceGPS({
        offline: true,
        sourceCache,
        sourceMapConsumerCache
      });
      return this.gps;
    }
  };

module.exports = {
  resolveErrorSources: error => {
    let promises = _.map(error, errTrace => {
      let stackFrame = new StackFrame(JSON.parse(errTrace));
      return StackTracer.getGPS()
        .pinpoint(stackFrame)
        .catch(err => stackFrame)
        .then(stackFrame => stackFrame.toString());
    });
    return Promise.all(promises);
  }
};
