const { dbProtocol, adminAuth, dbHost } = require("../appsettings.js"),
  PouchDB = require("pouchdb");

module.exports = (dbName, noAuth) => {
  let auth = noAuth ? "" : `${adminAuth.user}:${adminAuth.pass}@`,
    dbURL = `${dbProtocol}${auth}${dbHost}/${dbName}`;
  return { db: new PouchDB(dbURL), url: dbURL };
};
