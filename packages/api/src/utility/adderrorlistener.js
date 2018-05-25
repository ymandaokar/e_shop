const _ = require("lodash"),
  { ClientLogger, ServerLogger, ServerErrorLogger } = require("./logger.js"),
  getError = require("../helpers/getformattederror.js"),
  StackTraceMapper = require("./stacktracemapper.js"),
  getUpdatedError = error => {
    if (!error) {
      return Promise.resolve();
    }
    if (typeof error != "string") {
      if (error.stack) {
        return Promise.resolve(error.stack);
      }
      if (error.status) {
        return Promise.resolve(error);
      }
      return StackTraceMapper.resolveErrorSources(error);
    }
    return Promise.resolve(error);
  };
function addErrorListner(db) {
  return db
    .changes({
      since: "now",
      include_docs: true,
      live: true,
      filter: "documents/client_error"
    })
    .on("change", change => {
      let { doc } = change || {};
      if (doc && !doc._deleted && doc.docType == "client-error") {
        getUpdatedError(doc.error).then(err => {
          doc.error = err;
          ClientLogger.log("error", JSON.stringify(doc), {
            type: "client-error"
          });
        });
      }
    })
    .on("error", err => {
      ServerErrorLogger.error(
        `\`From DB changes feed [adderrorlistner.js](${db &&
          db.name})\`\n\`\`\`${getError(err)}\`\`\``
      );
    });
}
module.exports = addErrorListner;
