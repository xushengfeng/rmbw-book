import { getIndex, writeIndex } from "./until.mjs";
const index = getIndex();
import { execSync } from "node:child_process";

const booksId = process.argv.slice(2);

if (booksId.length) {
    for (const b of index.books) {
        if (booksId.includes(b.id)) b.updateTime = new Date().getTime();
    }
} else {
    execSync("git config core.quotepath false");
    const r = execSync("git status -s source").toString();
    const rl = r.split("\n").map((i) => i.slice(10));

    for (const b of index.books) {
        for (const s of b.sections) {
            if (rl.includes(s.path)) b.updateTime = new Date().getTime();
        }
    }
}

writeIndex(index);
