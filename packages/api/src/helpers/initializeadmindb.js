const Promise = require("bluebird"),
  surveyAdminDoc = require("./surveyadmindoc"),
  getNewDB = require("./getnewdb.js"),
  getError = require("../helpers/getformattederror.js"),
  settleAll = require("./settleAll/index.js"),
  indexes = require("./indexes/admin.js"),
  { forIn } = require("lodash"),
  { commonDB } = require("../appsettings.js"),
  { ServerErrorLogger, ServerLogger } = require("../utility/logger.js");

module.exports = () => {
  let { db } = getNewDB(commonDB);
  let promises = [];
  forIn(indexes, (value, key) => {
    promises.push(Promise.try(() => db.createIndex(value)));
  });
  return settleAll(promises).then(result => {
    ServerLogger.info("Index created", result);
    return db;
  });
};
