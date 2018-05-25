// Creates a Record object extended with the given type.
const im = require("immutable"),
    _ = require("lodash");
module.exports = (typeInfo) => {
    var
        deepConvertToImmutable = (item, goingDeep) => {
            if (!_.isPlainObject(item)
                && !_.isArray(item)) {
                return item;
            }
            if (_.isPlainObject(item)) {
                if (_.isEmpty(item)) {
                    return im.Map();
                }

                _.forOwn(item, (member, key, object) => {
                    // Deeply convert all members.
                    object[key] = deepConvertToImmutable(member, true);
                });

                // Create a new Record of this object schema.
                return goingDeep ? new (im.Record(item))() : im.Record(item);
            }

            if (_.isArray(item)) {
                return im.List(item);
            }
        },
        type = deepConvertToImmutable(typeInfo.schema);
    Object.assign(type.prototype, typeInfo.methods);
    return type;
}