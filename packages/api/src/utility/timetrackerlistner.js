const _ = require("lodash"),
  getError = require("../helpers/getformattederror.js"),
  { LoadTimeLogger, ServerErrorLogger } = require("./logger.js");
function timeTrackerListner(db) {
  return db
    .changes({
      since: "now",
      include_docs: true,
      live: true,
      filter: "documents/surveytracker_info"
    })
    .on("change", change => {
      let { doc } = change || {};
      if (doc && !doc._deleted && doc.docType == "surveytracker_info") {
        let trackerString = `Offset trails(seconds):\n`,
          { trackerInfo } = doc,
          userName,
          userEmail,
          surveyStartedAt,
          instanceType;
        trackerInfo.map(tracker => {
          if (tracker.instanceInfo) {
            userName = tracker.userName;
            userEmail = tracker.userEmail;
            surveyStartedAt = tracker.timeStamp;
            instanceType = tracker.instanceInfo;
          } else {
            trackerString += `\t${tracker.componentName}: ${tracker.offset}\n`;
          }
        });
        let fullString = `User: ${userName} (${userEmail})\n\n${
            instanceType
          }:\n\tSurvey started at: ${new Date(surveyStartedAt)}\n`,
          printString = "```" + fullString + trackerString + " ```";
        LoadTimeLogger.info(printString);
      }
    })
    .on("error", err => {
      ServerErrorLogger.error(
        `\`From DB changes feed [timeTrackerListner.js](${db &&
          db.name})\`\n\`\`\`${getError(err)}\`\`\``
      );
    });
}
module.exports = timeTrackerListner;
