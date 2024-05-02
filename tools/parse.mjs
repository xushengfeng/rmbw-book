import { getIndex, getFile, writeFile } from "./until.mjs";

const index = getIndex();

const booksId = process.argv.slice(2);

const englishMap = { "，": ",", "。": ".", "？": "?", "！": "!", "：": ":", "；": ";" };

for (let b of index.books) {
    let matchBook = false;
    if (booksId.includes(b.id)) matchBook = true;
    for (let s of b.sections) {
        if (matchBook || booksId.includes(s.id)) {
            let text = getFile(s.path);
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
    }
}
