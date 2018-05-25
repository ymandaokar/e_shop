const surveyAdminDoc = require("./surveyadmindoc"),
  getNewDB = require("./getnewdb.js"),
  getError = require("../helpers/getformattederror.js"),
  { ServerErrorLogger } = require("../utility/logger.js");

module.exports = () => {
  let { db } = getNewDB("surveyadmin");
  return db
    .find({
      selector: { docType: "defaultemailtemplate" },
      fields: ["_id"]
    })
    .then(result => {
      if (result.docs && result.docs.length) {
        return;
      }
      return db.put(surveyAdminDoc);
    })
    .catch(err => {
      ServerErrorLogger.error(
        `\`initializeadmindb.js\`\n\`\`\`Error: ${getError(err)}\`\`\``
      );
    });
};
