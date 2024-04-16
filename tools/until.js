const fs = require("fs");
const path = require("path");

module.exports = { getFile, writeFile };

function getFile(fpath) {
    return fs.readFileSync(path.join(__dirname, "../source/", fpath)).toString();
}

/**
 *
 * @param {string} fpath
 * @param {string} data
 * @returns
 */
function writeFile(fpath, data) {
    return fs.writeFileSync(path.join(__dirname, "../source/", fpath), data);
}
