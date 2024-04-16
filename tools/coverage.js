const fs = require("fs");
const { getFile, writeFile } = require("./until");
const lemmatizer = require("lemmatizer");
const index = JSON.parse(fs.readFileSync("index.json").toString());

const booksId = process.argv.slice(2);
let booksWords = [];

let titleMap = {};

let words = {};

for (let b of index.books) {
    titleMap[b.id] = b.name;
    for (let s of b.sections) {
        titleMap[s.id] = s.title;
    }
    if (b.type === "word") {
        for (let s of b.sections) {
            const wordL = getFile(s.path).trim().split("\n");
            words[s.id] = wordL;
        }
    }
}

for (let b of index.books) {
    if (b.type === "text") {
        const segmenter = new Intl.Segmenter(b.language, { granularity: "word" });
        /*** @type string[]*/
        let bwords = [];
        for (let s of b.sections) {
            const word = getFile(s.path);
            const wordL = Array.from(segmenter.segment(word)).map((i) => i.segment);
            const wordL2 = wordL.map((w) => lemmatizer.lemmatizer(w));
            bwords = bwords.concat(wordL).concat(wordL2);
        }
        if (booksId.includes(b.id)) booksWords = booksWords.concat(bwords);
        let c = {};
        b["coverage"] = c;
        console.log("\n" + b.name);
        for (let i in words) {
            const n = intersectionCount(words[i], bwords);
            c[i] = [n, words[i].length];
            console.log(`${titleMap[i]}: ${n}/${words[i].length}=${(n / words[i].length) * 100}%`);
        }
        b.updateTime = new Date().getTime();
    }
}

if (booksId.length === 0) fs.writeFileSync("index.json", JSON.stringify(index));
else {
    console.log("\n" + booksId.map((b) => titleMap[b]).join(" "));
    let c = {};
    for (let i in words) {
        const n = intersectionCount(words[i], booksWords);
        c[i] = n / words[i].length;
        console.log(`${titleMap[i]}: ${n}/${words[i].length}=${c[i] * 100}%`);
    }
}

/**
 * @param {string[]} a
 * @param {string[]} b
 */
function intersectionCount(a, b) {
    // 使用 Set 数据结构去除重复元素
    a = Array.from(new Set(a));
    const setB = new Set(b);

    // 筛选出同时出现在两个集合中的元素
    const intersection = a.filter((item) => setB.has(item));

    // 返回交集的长度
    return intersection.length;
}
