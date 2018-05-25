const {
    ServerLogger,
    ServerCrashLogger,
    ServerErrorLogger
  } = require("./utility/logger.js"),
  ObjectID = require("bson-objectid"),
  getError = require("./helpers/getformattederror.js"),
  { errorLogFileName } = require("./appsettings.js"),
  _ = require("lodash"),
  fs = require("fs");

function appendError(logErr) {
  fs.appendFileSync(
    `${__dirname}/log/${errorLogFileName}.log`,
    `\`Uncaught server side exception\`\n \`\`\`timestamp: ${new Date().toISOString()}\n${getError(
      logErr
    )}\`\`\`\n`
  );
  console.error(`Uncaught server side exception: ${getError(logErr)}`);
}
function log(logErr, p) {
  if (p) {
    ServerErrorLogger.error(
      `\`Unhandled server side rejection\`\n \`\`\`timestamp: ${new Date().toISOString()}\n${getError(
        logErr
      )}\`\`\``
    );
    return;
  }
  if (fs.existsSync(`${__dirname}/log`)) {
    appendError(logErr);
  } else {
    fs.mkdirSync(`${__dirname}/log`);
    appendError(logErr);
  }
}
function registerErrorListener(listener) {
  process.on(listener, log);
}
function logExceptionfromFile(loggedFileName, attachRecords) {
  if (fs.existsSync(`${__dirname}/log/${loggedFileName}.log`)) {
    fs.readFile(
      `${__dirname}/log/${loggedFileName}.log`,
      "utf8",
      (err, data) => {
        if (err) {
          console.error(`handleexception.js:readFile: ${getError(err)}`);
          return;
        }
        ServerCrashLogger.crasherror(data);
        if (attachRecords) {
          let options = {
            from: new Date() - 24 * 60 * 60 * 1000,
            until: new Date(),
            limit: 10,
            start: 0,
            order: "desc",
            fields: ["message"]
          };
          ServerErrorLogger.query(options, (err, results) => {
            if (err) {
              ServerErrorLogger.error(
                `\`handleexception.js:logExceptionfromFile:ServerErrorLogger:query\`\n \`\`\`timestamp: ${new Date().toISOString()}\n${getError(
                  err
                )}\`\`\``
              );
              return;
            }
            if (results && results.file) {
              _.forEach(results.file, err => {
                ServerCrashLogger.servererror(err.message);
              });
            }
          });
        }
        let date = new Date(),
          fileName = `${loggedFileName}_${date.getDate()}_${date.getMonth() +
            1}_${date.getFullYear()}`;
        fs.appendFile(`${__dirname}/log/${fileName}.log`, data, err => {
          if (err) {
            console.error(
              `handleexception.js:rename:writeFile: ${getError(err)}`
            );
            return;
          }
          ServerLogger.errorlogfile(
            `\`${fileName}\`\n\`\`\`timestamp: ${date.toISOString()}\`\`\``
          );
          fs.unlinkSync(`${__dirname}/log/${loggedFileName}.log`);
        });
      }
    );
  }
}
module.exports = () => {
  logExceptionfromFile(errorLogFileName, true);
  registerErrorListener("unhandledRejection");
  registerErrorListener("uncaughtException");
};
