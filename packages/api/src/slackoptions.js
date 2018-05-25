const {
  serverURL,
  serverChannel,
  serverErrorURL,
  serverErrorChannel,
  serverCrashURL,
  serverCrashChannel,
  clientErrorURL,
  clientErrorChannel,
  userEventsURL,
  userEventsChannel,
  surveyLoadTimeURL,
  surveyLoadTimeChannel
} = process.env;
module.exports = {
  server: {
    webhook_url: serverURL || "",
    channel: serverChannel || "#dev-console",
    username: "InfoBot",
    level: "warn",
    handleExceptions: true,
    name: "server"
  },
  serverError: {
    webhook_url: serverErrorURL || "",
    channel: serverErrorChannel || "#dev-exception",
    username: "ErrorBot",
    level: "warn",
    handleExceptions: true,
    name: "server_error"
  },
  serverCrash: {
    webhook_url: serverCrashURL || "",
    channel: serverCrashChannel || "#dev-crash",
    username: "ErrorBot",
    level: "warn",
    handleExceptions: true,
    name: "server_crash"
  },
  clientError: {
    webhook_url: clientErrorURL || "",
    channel: clientErrorChannel || "#dev-errorconsole",
    username: "ErrorBot",
    level: "error",
    handleExceptions: true,
    name: "client"
  },
  userEvents: {
    webhook_url: userEventsURL || "",
    channel: userEventsChannel || "#dev-userevents",
    username: "EventBot",
    level: "info",
    handleExceptions: true,
    name: "event"
  },
  surveyLoadTime: {
    webhook_url: surveyLoadTimeURL || "",
    channel: surveyLoadTimeChannel || "#dev-survey_load_time",
    username: "TimerBot",
    level: "info",
    handleExceptions: true,
    name: "event"
  }
};
