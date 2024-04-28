const fs = require("fs");
const { getFile, writeFile, getIndex } = require("./until");
const index = getIndex();

for (let b of index.books) {
    for (let s of b.sections) {
        if (!s.id) {
            s.id = b.id + crypto.randomUUID().slice(0, 6);
        }
        if (!s.title) {
            const text = getFile(s.path).split("\n");
            if (!text.at(0).startsWith("# ")) continue;
            const title = text.at(0).slice(1).trim();
            s.title = title;
            writeFile(s.path, text.slice(1).join("\n"));
        }
    }
}

fs.writeFileSync("index.json", JSON.stringify(index));
