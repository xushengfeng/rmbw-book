import { getIndex, writeIndex } from "./until.mjs";

import { titleCase } from "title-case";

const index = getIndex();

const booksId = process.argv.slice(2);

for (let b of index.books) {
    if (booksId.includes(b.id)) {
        for (let s of b.sections) {
            s.title = titleCase(s.title.toLocaleLowerCase());
        }
    }
}

writeIndex(index);
