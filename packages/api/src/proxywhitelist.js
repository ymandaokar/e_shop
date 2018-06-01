var _ = require("lodash");
module.exports = function proxyCheck(proxypath) {
  var dbPaths = [
      "_all_docs",
      "_bulk_docs",
      "_changes",
      "_local",
      "_design",
      "_revs_diff",
      "_bulk_get",
      "_find"
    ],
    _dbPaths = proxypath.split("/");
  if (
    !(
      _.startsWith(_dbPaths[1], "ecart%24") ||
      _.startsWith(_dbPaths[1], "ecart$")
    )
  )
    return false;
  if (_dbPaths[2] == "" || _.indexOf(dbPaths, _dbPaths[2]) != -1) return true;
  if (!_dbPaths[2]) return true;
  if (_dbPaths[2][0] != "_") return true;
  return false;
};
