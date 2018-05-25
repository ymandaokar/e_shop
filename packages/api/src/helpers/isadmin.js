const _ = require("lodash"),
  { adminRole } = require("../appsettings.js");

module.exports = (roles = []) => {
  return _.indexOf(roles, adminRole) != -1;
};
