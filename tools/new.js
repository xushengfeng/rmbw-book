const fs = require("fs");
const index = JSON.parse(fs.readFileSync("index.json").toString());

for (let b of index.books) {
    if (b.type === "text") {
        for (let s of b.sections) {
            if (!s.id) {
                s.id = b.id + crypto.randomUUID().slice(0, 6);
            }
        }
    }
}

fs.writeFileSync("index.json", JSON.stringify(index));
