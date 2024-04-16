const { getIndex, getFile, writeFile } = require("./until");

const index = getIndex();

const booksId = process.argv.slice(2);

for (let b of index.books) {
    if (b.type === "text") {
        let matchBook = false;
        if (booksId.includes(b.id)) matchBook = true;
        for (let s of b.sections) {
            if (matchBook || booksId.includes(s.id)) {
                let text = getFile(s.path);
                text = text.replace(/([,.!?])([A-Za-z])/g, "$1 $2");
                text = text.replace(/ +/g, " ");
                writeFile(s.path, text);
            }
        }
    }
}
