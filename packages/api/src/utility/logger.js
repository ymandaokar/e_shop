const winston = require("winston"),
  appsettings = require("../appsettings.js"),
  { exceptionLogFileName } = appsettings,
  {
    consoleOptions,
    couchDBOptions,
    enableConsoleTransport,
    enableFileTransport,
    enableSlackTransport,
    enableCouchDbTransport,
    userEventsCoustomLevels,
    enableClientErrorFileTransport,
    clientErrorFileOptions,
    exitOnError,
    level,
    slackOptions,
    fileOptions,
    errorSlack
  } = appsettings.winstonLogger,
  {
    server,
    clientError,
    userEvents,
    serverError,
    serverCrash,
    surveyLoadTime
  } = slackOptions,
  //Slack = require("../helpers/winston-slack-transport/index.js"),
  Couch = require("winston-couch").Couch,
  _ = require("lodash"),
  catagaries = {
    error: {
      console: enableConsoleTransport && consoleOptions,
      file: { filename: `${global.PATH}/log/allerrors.log` }
    },
    serverError: {
      file: { filename: `${global.PATH}/log/servererrors.log` },
      console: enableConsoleTransport && consoleOptions
    },
    serverCrash: {
      file: { filename: `${global.PATH}/log/servercrash.log` },
      console: enableConsoleTransport && consoleOptions
    },
    server: {
      file: enableFileTransport && fileOptions,
      console: enableConsoleTransport && consoleOptions
    },
    client: {
      file: enableClientErrorFileTransport && clientErrorFileOptions,
      console: enableConsoleTransport && consoleOptions
    },
    user_events: {
      console: enableConsoleTransport && consoleOptions
    },
    user_event_log: {
      console: enableConsoleTransport && consoleOptions
    },
    load_time_logger: {
      file: { filename: `${global.PATH}/log/surveyloadtimeanalysis.log` },
      console: enableConsoleTransport && consoleOptions
    }
  };
getTransports = catagary => {
  return _.pickBy(catagaries[catagary], prop => !!prop);
};

winston.handleExceptions(
  new winston.transports.File({
    filename: `${global.PATH}/log/${exceptionLogFileName}.log`
  })
);

//adding loggers
winston.loggers.add("error", getTransports("error"));

winston.loggers.add("serverError", getTransports("serverError"));

winston.loggers.add("serverCrash", getTransports("serverCrash"));

winston.loggers.add("server", getTransports("server"));

winston.loggers.add("client", getTransports("client"));

winston.loggers.add("user_events", getTransports("user_events"));

winston.loggers.add("user_event_log", getTransports("user_event_log"));

winston.loggers.add("load_time_logger", getTransports("load_time_logger"));

//get logger instance
let ErrorLogger = winston.loggers.get("error"),
  ServerErrorLogger = winston.loggers.get("serverError"),
  ServerCrashLogger = winston.loggers.get("serverCrash"),
  ServerLogger = winston.loggers.get("server"),
  ClientLogger = winston.loggers.get("client"),
  UserEventLogger = winston.loggers.get("user_events"),
  UserEventLogLogger = winston.loggers.get("user_event_log"),
  LoadTimeLogger = winston.loggers.get("load_time_logger"),
  getError = error => {
    if (typeof error === "string") {
      return `\n${error}`;
    }
    let errString = "";
    _.forIn(error, (value, key) => {
      errString += `\n${_.capitalize(key)}: ${value}`;
    });
    return errString;
  },
  getFormattedError = msg => {
    let errorObj = JSON.parse(msg),
      { URL, column, line, userInfo, message, error, type } = errorObj,
      {
        name,
        email,
        userDbUrl,
        route,
        operatingSystem,
        browser,
        description,
        userAgent
      } = userInfo;
    return `\`${message}\`\n\`\`\`Type: ${type}${(!_.isUndefined(line) &&
      `\nLine: ${line}`) ||
      ""}${(!_.isUndefined(column) && `\nColumn: ${column}`) || ""}${getError(
      error
    )}\nUserInfo: \n\t Name: ${name}\n\t Email: ${email}\n\t User DBURL: ${userDbUrl}\n\t Location: ${route}\n\t OS: ${operatingSystem}\n\t Browser: ${browser}\n\t Description: ${description}\n\t User Agent: ${userAgent}\n\`\`\``;
  },
  handleError = err => {
    ErrorLogger.error(err);
  };

// If want to change msg then use filters and if want to change meta use rewriters...!
ClientLogger.filters.push((level, msg, meta) => {
  if (meta.type && meta.type == "client-error") return getFormattedError(msg);
  return msg;
});

//set levels
UserEventLogger.setLevels(
  _.merge(UserEventLogger.levels, userEventsCoustomLevels.levels)
);
UserEventLogLogger.setLevels(
  _.merge(UserEventLogLogger.levels, userEventsCoustomLevels.levels)
);
ServerLogger.setLevels(
  _.merge(ServerLogger.levels, userEventsCoustomLevels.levels)
);
ServerCrashLogger.setLevels(
  _.merge(ServerCrashLogger.levels, userEventsCoustomLevels.levels)
);
winston.addColors(userEventsCoustomLevels.colors);

//handle exit on error
ErrorLogger.exitOnError = exitOnError;
ServerErrorLogger.exitOnError = exitOnError;
ServerCrashLogger.exitOnError = exitOnError;
ServerLogger.exitOnError = exitOnError;
ClientLogger.exitOnError = exitOnError;
UserEventLogger.exitOnError = exitOnError;
UserEventLogLogger.exitOnError = exitOnError;
LoadTimeLogger.exitOnError = exitOnError;

//handle error event
ErrorLogger.emitErrs = false;
ServerErrorLogger.on("error", handleError);
ServerCrashLogger.on("error", handleError);
ServerLogger.on("error", handleError);
ClientLogger.on("error", handleError);
UserEventLogger.on("error", handleError);
UserEventLogLogger.on("error", handleError);
LoadTimeLogger.on("error", handleError);

module.exports = {
  ServerErrorLogger,
  ServerCrashLogger,
  ServerLogger,
  ClientLogger,
  UserEventLogger,
  UserEventLogLogger,
  LoadTimeLogger
};
