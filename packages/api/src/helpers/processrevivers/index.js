const _ = require("lodash");
module.exports = (item, model) => {
    var revivers = item.revivers,
        reviverKeys = Object.keys(revivers);
    _.forIn(reviverKeys, (reviverKey) => {
        item = revivers[reviverKey].call(item, model);
    })

    return item;
};