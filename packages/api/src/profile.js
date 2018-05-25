var BPromise = require("bluebird"),
  _ = require("lodash"),
  isAdmin = require("./helpers/isadmin.js");

module.exports = function(superlogin) {
  var userDB = superlogin.userDB;

  this.get = user_id => {
    var profile = {};
    return userDB.get(user_id).then(userDoc => {
      profile._id = userDoc._id;
      profile.name = userDoc.name;
      profile.email = userDoc.email;
      profile.providers = userDoc.providers;
      profile.thumbnail = userDoc[userDoc.providers[0]].profile.photos[0].value;
      profile.isAdmin = isAdmin(userDoc.roles);
      // Make a list
      var providerConfig = superlogin.config.getItem("providers");
      var allProviders = [];
      if (providerConfig) {
        Object.keys(providerConfig).forEach(key => {
          allProviders.push(key);
        });
      }
      profile.allProviders = allProviders;
      profile.sessions = 0;
      if (userDoc.session) {
        profile.sessions = Object.keys(userDoc.session).length;
      }
      let dbs = Object.keys(userDoc.personalDBs);
      let surveyDBs = _.remove(dbs, db => {
        return _.startsWith(db, "survey");
      });
      return BPromise.resolve({ profile, surveyDBs });
    });
  };

  this.changeName = (user_id, newName) => {
    return userDB.get(user_id).then(function(userDoc) {
      userDoc.name = newName;
      return userDB.put(userDoc);
    });
  };
};
