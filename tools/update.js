const { getIndex, writeIndex } = require("./until");
const index = getIndex();
const { execSync } = require("child_process");

execSync("git config core.quotepath false");
const r = execSync("git status -s source").toString();
const rl = r.split("\n").map((i) => i.slice(10));

for (let b of index.books) {
    if (b.type === "text") {
        for (let s of b.sections) {
            if (rl.includes(s.path)) b.updateTime = new Date().getTime();
        }
    }
}

writeIndex(index);
