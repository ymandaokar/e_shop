function getError(err) {
  if (!err) {
    return "";
  }
  if (typeof err != "string") {
    if (err.stack) {
      return err.stack;
    }
    return JSON.stringify(err, null, 2);
  }
  return err;
}

module.exports = getError;
