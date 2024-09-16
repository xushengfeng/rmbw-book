import { readFileSync, writeFileSync } from "fs";
import path from "path";

export { getFile, writeFile, getIndex, writeIndex, initLemmatizer, lemmatizer };

function getFile(fpath) {
    return readFileSync(path.join("source/", fpath)).toString();
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
