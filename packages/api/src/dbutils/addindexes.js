const _ = require("lodash"),
  Promise = require("bluebird"),
  indexes = require("./indexes.js"),
  settleAll = require("../helpers/settleAll/index.js");

module.exports = db => {
  let promises = [];
  _.forIn(indexes, (value, key) => {
    promises.push(Promise.try(() => db.createIndex(value)));
  });
  return settleAll(promises);
};
