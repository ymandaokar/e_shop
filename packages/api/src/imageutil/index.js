var _ = require('lodash'),
    dataurl = require('dataurl'),
    fs = require('fs'),
    easyimg = require('easyimage');

module.exports = (filePath, dimention, mimetype) => {
    return easyimg.resize({
        src: filePath,
        dst: `./server/thumbnails/image${dimention}.jpg`,
        height: dimention,
        width: dimention
    }).then((image) => {
        return fs.createReadStream(image.path).pipe(
            dataurl.stream({ mimetype })
        );
    })
}