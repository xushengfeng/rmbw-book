const fs = require("fs");
const path = require("path");
const lemmatizer = require("lemmatizer");
const index = JSON.parse(fs.readFileSync("index.json").toString());

console.log(lemmatizer.lemmatizer("doing"));

let words = {};

for (let b of index.books) {
    if (b.type === "word") {
        for (let s of b.sections) {
            const wordL = fs.readFileSync(path.join(__dirname, "../source/", s.path)).toString().trim().split("\n");
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
            const word = fs.readFileSync(path.join(__dirname, "../source/", s.path)).toString();
            const wordL = Array.from(segmenter.segment(word)).map((i) => i.segment);
            const wordL2 = wordL.map((w) => lemmatizer.lemmatizer(w));
            bwords = bwords.concat(wordL).concat(wordL2);
        }
        let c = {};
        b["coverage"] = c;
        for (let i in words) {
            c[i] = intersectionCount(words[i], bwords) / words[i].length;
        }
        b.updateTime = new Date().getTime();
    }
}

fs.writeFileSync("index.json", JSON.stringify(index));

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
