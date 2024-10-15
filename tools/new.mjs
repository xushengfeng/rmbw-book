import { getFile, writeFile, getIndex, writeIndex } from "./until.mjs";
const index = getIndex();

for (const b of index.books) {
    for (const s of b.sections) {
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

writeIndex("index.json", JSON.stringify(index));
