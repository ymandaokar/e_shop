module.exports = {
  docType: {
    index: {
      fields: ["docType"]
    },
    name: "docType",
    ddoc: "doctype"
  },
  product: {
    index: {
      fields: ["docType", "name", "categories", "price", "discount"]
    },
    name: "product",
    ddoc: "product"
  },
  categories: {
    index: {
      fields: ["docType", "code", "name", "tags"]
    },
    name: "categories",
    ddoc: "categories"
  }
};
