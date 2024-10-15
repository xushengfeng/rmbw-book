import { getIndex, writeIndex } from "./until.mjs";

import { titleCase } from "title-case";

const index = getIndex();

const booksId = process.argv.slice(2);

for (const b of index.books) {
    if (booksId.includes(b.id)) {
        for (const s of b.sections) {
            s.title = titleCase(s.title.toLocaleLowerCase());
        }
    }
}

writeIndex(index);
