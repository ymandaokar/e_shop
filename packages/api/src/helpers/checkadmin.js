const _ = require("lodash"),
  { admins, adminRole } = require("../appsettings.js");

module.exports = (userDoc, provider) => {
  if (_.indexOf(admins, userDoc.user_id) == -1) {
    return Promise.resolve(userDoc);
  }
  if (_.indexOf(userDoc.role, adminRole) == -1) {
    userDoc.roles.push(adminRole);
  }
  return Promise.resolve(userDoc);
};
