import { writeFileSync, readFileSync } from "fs";

import { titleCase } from "title-case";

const index = JSON.parse(readFileSync("index.json").toString());

const booksId = process.argv.slice(2);

for (let b of index.books) {
    if (booksId.includes(b.id)) {
        for (let s of b.sections) {
            s.title = titleCase(s.title.toLocaleLowerCase());
        }
    }
}

writeFileSync("index.json", JSON.stringify(index));
