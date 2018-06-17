let Promise = require('bluebird');
module.exports = (promises) => {
    //console.log(promises);
    return Promise.all(promises.map((promise) => {
        //console.log(promise);
        return promise.reflect();
    })).each((inspection) => {
        //console.log(inspection);
        if (inspection.isFulfilled()) {
            return inspection.value();
        } else {
            return inspection.reason();
        }
    });
};