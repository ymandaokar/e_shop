const fs = require("fs");
module.exports = app => {
  if (!process.env.IS_SSL) {
    return app.listen(app.get("port"), "0.0.0.0");
  }
};
