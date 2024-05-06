import { getIndex, getFile, writeFile } from "./until.mjs";

const index = getIndex();

const booksId = process.argv.slice(2);

const englishMap = { "，": ",", "。": ".", "？": "?", "！": "!", "：": ":", "；": ";" };
const chineseMap = { ",": "，", "?": "？", "!": "！", ":": "：", ";": "；" };

for (let b of index.books) {
    let matchBook = false;
    if (booksId.includes(b.id)) matchBook = true;
    for (let s of b.sections) {
        if (matchBook || booksId.includes(s.id)) {
            let text = getFile(s.path);
            if (b.language === "en") {
                if (b.type === "text") {
                    for (let i in englishMap) {
                        text = text.replaceAll(i, englishMap[i]);
                    }
                    text = text.replace(/([,.!?;])([A-Za-z])/g, "$1 $2");
                    text = text.replace(/ +/g, " ");
                    text = text.replace(/(\w+)'(\w+)/g, "$1’$2");
                    writeFile(s.path, text);
                }
                if (b.type === "word") {
                    let l = text.split("\n");
                    l = l.map((w) => w.trim());
                    l = Array.from(new Set(l));
                    writeFile(s.path, l.join("\n"));
                }
            }
            if (b.language === "cn") {
                if (b.type === "text") {
                    text = text.replace(/(\d)/g, "");
                    text = text.replace(/ +/g, "");
                    text = text.replace(/([@#!])/g, "");
                    text = text.replace(/([a-z])/g, "");
                    text = text.replace(/\n+/g, "\n");
                    for (let i in chineseMap) {
                        text = text.replaceAll(i, chineseMap[i]);
                    }
                    text = text.trim();
                    writeFile(s.path, text);
                }
            }
        }
    }
}
