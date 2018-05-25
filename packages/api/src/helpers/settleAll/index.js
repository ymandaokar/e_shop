let Promise = require("bluebird");
module.exports = promises => {
  return Promise.all(
    promises.map(promise => {
      return promise.reflect();
    })
  ).each(inspection => {
    if (inspection.isFulfilled()) {
      return inspection.value();
    } else {
      return inspection.reason();
    }
  });
};
