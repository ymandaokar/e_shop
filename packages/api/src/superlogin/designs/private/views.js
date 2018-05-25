module.exports = {
  getByDocType: {
    _id: "_design/getByDocType",
    views: {
      typed: {
        map: function(doc) {
          if (doc.docType) {
            emit(doc.docType);
          }
        }
      }
    },
    language: "javascript"
  }
};
