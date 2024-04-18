const { getIndex, getFile, writeFile } = require("./until");

const index = getIndex();

const booksId = process.argv.slice(2);

const englishMap = { "，": ",", "。": ".", "？": "?", "！": "!", "：": ":", "；": ";" };

for (let b of index.books) {
    if (b.type === "text") {
        let matchBook = false;
        if (booksId.includes(b.id)) matchBook = true;
        for (let s of b.sections) {
            if (matchBook || booksId.includes(s.id)) {
                let text = getFile(s.path);
                for (let i in englishMap) {
                    text = text.replaceAll(i, englishMap[i]);
                }
                text = text.replace(/([,.!?;])([A-Za-z])/g, "$1 $2");
                text = text.replace(/ +/g, " ");
                text = text.replace(/(\w+)'(\w+)/g, "$1’$2");
                writeFile(s.path, text);
            }
        }
    }
}
