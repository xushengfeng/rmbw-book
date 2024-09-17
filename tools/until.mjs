import { readFileSync, writeFileSync } from "fs";
import path from "path";

export { getFile, getFilePath, writeFile, getIndex, writeIndex, initLemmatizer, lemmatizer };

function getFilePath(fpath) {
    return path.join("source/", fpath);
}

function getFile(fpath) {
    return readFileSync(getFilePath(fpath)).toString();
}

/**
 *
 * @param {string} fpath
 * @param {string} data
 * @returns
 */
function writeFile(fpath, data) {
    return writeFileSync(path.join("source/", fpath), data);
}

function getIndex() {
    /** @type {{books:{"name": string,"id": string,"type": "word"|"text"|"package"|"dictionary","updateTime": number,"sections": { "id": string, "title": string, "path": string }[],"language": string,coverage?:{[key:string]:[number,number]}}[]}} */
    const index = JSON.parse(readFileSync("index.json").toString());
    return index;
}

function writeIndex(index) {
    writeFileSync("index.json", JSON.stringify(index, null, 2));
}

function initLemmatizer() {
    return JSON.parse(readFileSync("source/package/en/variant.json").toString());
}

function lemmatizer(word, v) {
    return v?.[word] || word;
}
