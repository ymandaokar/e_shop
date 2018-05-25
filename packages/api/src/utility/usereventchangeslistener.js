const {
    ServerLogger,
    UserEventLogLogger,
    ServerErrorLogger
  } = require("./logger.js"),
  views = require("./usereventsviews.js"),
  getError = require("../helpers/getformattederror.js"),
  seed = require("pouchdb-seed-design");
function userEventChangeListner(db) {
  seed(db, views).then(() => {
    db
      .changes({
        since: "now",
        live: true,
        include_docs: true,
        filter: "documents/survey_request_response"
      })
      .on("change", change => {
        let { doc } = change || {};
        if (
          !doc ||
          !doc.meta ||
          (doc.meta.subType != "surveyrequest" &&
            doc.meta.subType != "surveyresponse")
        ) {
          return;
        }
        if (doc.meta.subType == "surveyrequest") {
          db.query("count/surveyrequest", { reduce: true }).then(result => {
            UserEventLogLogger.info(
              `${result.rows[0].value} access survey served`
            );
          });
        }
        if (doc.meta.subType == "surveyresponse") {
          db.query("count/surveyresponse", { reduce: true }).then(result => {
            UserEventLogLogger.info(
              `${result.rows[0].value} access survey completed`
            );
          });
        }
      })
      .on("error", err => {
        //db
        ServerErrorLogger.error(
          `\`user event change listener ${db && db.name}\`\n\`\`\`${getError(
            err
          )}\`\`\``
        );
      });
  });
}

module.exports = userEventChangeListner;
