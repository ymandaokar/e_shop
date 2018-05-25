module.exports = {
  documents: {
    _id: "_design/documents",
    filters: {
      typed: function(doc, req) {
        var type = req && req.query && req.query.type ? req.query.type : false;
        if (type) {
          return doc.docType === type;
        }
        return "docType" in doc;
      }
    }
  }
};
