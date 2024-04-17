const fs = require("fs");
const path = require("path");

module.exports = { getFile, writeFile, getIndex, writeIndex };

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

function getIndex() {
    /** @type {{books:{"name": string,"id": string,"type": "word"|"text","updateTime": number,"sections": { "id": string, "title": string, "path": string }[],"language": string,coverage?:{[key:string]:[number,number]}}[]}} */
    const index = JSON.parse(fs.readFileSync(path.join(__dirname, "../", "index.json")).toString());
    return index;
}

function writeIndex(index) {
    fs.writeFileSync("index.json", JSON.stringify(index));
}
