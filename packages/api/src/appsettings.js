const slackOptions = require("./slackoptions.js"),
  serverHostName = process.env.WEBSITE_URL || "http://localhost:8081",
  cdbUser = process.env.COUCHDB_USER || "admin",
  cdbPass = process.env.COUCHDB_PASSWORD || "admin",
  dbHost = `${process.env.COUCHDB_SERVICE_HOST || "localhost"}:${process.env
    .COUCHDB_SERVICE_PORT || 5984}`;
module.exports = {
  dbProtocol: "http://",
  dbHost,
  appTitle: "quizMe",
  appLink: `${serverHostName}/#/`,
  serverLink: `${serverHostName}`,
  buildPath: "build",
  errorLogFileName: "error",
  exceptionLogFileName: "exception",
  smtpTransporter: {
    host: process.env.SMTP_HOST || "smtp-relay.gmail.com",
    port: process.env.SMTP_PORT || "587",
    auth: {
      user: process.env.SMTP_USER || "yogesh@bitpod.io",
      pass: process.env.SMTP_PASSWORD || "Matrix@123"
    }
  },
  adminRole: "admin",
  adminAuth: {
    user: cdbUser,
    pass: cdbPass
  },
  dbServer: {
    userDB: `http://${cdbUser}:${cdbPass}@${dbHost}/${process.env
      .COUCHDB_SLUSERDB || "ecart-cand"}`,
    couchAuthDB: `http://${cdbUser}:${cdbPass}@${dbHost}/${process.env
      .COUCHDB_AUTHDB || "_users"}`
  },
  tempImagesPath: {
    dest: "./server/temp"
  },
  shortUrl: {
    apiKey:
      process.env.SHORT_URL_KEY || "AIzaSyBKAL6miYV8VMMDsooQTefxrfxkrvzqwCQ"
  },
  mediaAPIEndpoint: "/media",
  sharedPath: "message/shared",
  winstonLogger: {
    level: "info",
    enableConsoleTransport: true,
    enableFileTransport: true,
    enableSlackTransport: true,
    enableCouchDbTransport: true,
    enableClientErrorFileTransport: true,
    userEventsCoustomLevels: {
      levels: {
        login: 1,
        logout: 1,
        errorlogfile: 1,
        profile: 1,
        crasherror: 0,
        servererror: 0
      },
      colors: {
        login: "blue",
        surveyrequest: "yellow",
        surveyresponse: "yellow",
        logout: "blue",
        errorlogfile: "yellow",
        profile: "blue",
        crasherror: "red",
        servererror: "red"
      }
    },
    exitOnError: false,
    consoleOptions: {
      prettyPrint: true,
      colorize: "all",
      json: false,
      humanReadableUnhandledException: false,
      timestamp: function() {
        return Date.now();
      }
    },
    fileOptions: { filename: `${global.PATH}/log/server.log` },
    clientErrorFileOptions: { filename: `${global.PATH}/log/clienterror.log` },
    couchDBOptions: {
      pouchOptions: `http://${cdbUser}:${cdbPass}@${dbHost}/usereventslog`,
      level: "info"
    },
    slackOptions
  }
};
