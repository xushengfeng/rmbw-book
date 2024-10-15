import { readFileSync } from "node:fs";
import { getFile, getIndex, initLemmatizer, lemmatizer } from "./until.mjs";
const v = initLemmatizer();
const index = getIndex();

const booksId = process.argv.slice(2);

const words = readFileSync(booksId[0]).toString().split("\n");

const bookWord = {};

const matchWords = [];

for (const b of index.books) {
    if (b.type === "text") {
        const segmenter = new Intl.Segmenter(b.language, { granularity: "word" });
        for (const s of b.sections) {
            const word = getFile(s.path);
            const wordL = Array.from(segmenter.segment(word)).map((i) => i.segment);
            const wordL2 = wordL.map((w) => lemmatizer(w, v));
            for (const i of words) {
                if (wordL2.includes(i)) {
                    if (!bookWord[s.id]) bookWord[s.id] = { s: s.title, b: b.name, w: [] };
                    bookWord[s.id].w.push(i);
                    matchWords.push(i);
                }
            }
        }
    }
}

console.log(bookWord);
const uf = words.filter((w) => !matchWords.includes(w));
console.log("unfound", uf.length, uf.join(", "));
