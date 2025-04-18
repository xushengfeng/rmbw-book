import { getIndex, getFilePath } from "./until.mjs";
import fs from "node:fs";
const index = getIndex();

for (const b of index.books) {
    if (b.cover) {
        const coverPath = getFilePath(b.cover);
        fs.existsSync(coverPath) || console.log(`cover file not found: ${JSON.stringify(b, null, 2)}`);
    }
    for (const s of b.sections) {
        const filePath = getFilePath(s.path);
        fs.existsSync(filePath) || console.log(`File not found: ${JSON.stringify(s, null, 2)}`);
    }
}

console.log("check done");
