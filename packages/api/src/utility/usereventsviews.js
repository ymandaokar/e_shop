module.exports = {
  documents: {
    _id: "_design/documents",
    filters: {
      survey_request_response: function(doc, req) {
        if (doc.level == "surveyrequest" || doc.level == "surveyresponse") {
          return true;
        }
        return false;
      }
    }
  },
  count: {
    _id: "_design/count",
    views: {
      surveyrequest: {
        map: function(doc) {
          if (doc.meta && doc.meta.subType == "surveyrequest") {
            emit(doc.meta.subType);
          }
        },
        reduce: "_count"
      },
      surveyresponse: {
        map: function(doc) {
          if (doc.meta && doc.meta.subType == "surveyresponse") {
            emit(doc.meta.subType);
          }
        },
        reduce: "_count"
      }
    },
    language: "javascript"
  }
};
