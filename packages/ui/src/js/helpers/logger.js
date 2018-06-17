const Logger = REMOVE_LOGS
  ? {
      log: () => {},
      info: () => {},
      debug: () => {},
      warn: () => {},
      error: () => {}
    }
  : {
      log: console.log.bind(console),
      info: console.info.bind(console),
      debug: console.debug.bind(console),
      warn: console.warn.bind(console),
      error: console.error.bind(console)
    };
export default Logger;
