import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

const database = new DatabaseSync("bcz/lookup.db");

const query = database.prepare("SELECT topic_id, word FROM dict_bcz");
const qSet = new Map();
for (const i of query.all()) {
    qSet.set(i.topic_id, i.word);
}

function transFile(file, output) {
    const regex = /(\w+?)\((\w+)\)/;

    const f = fs.readFileSync(file);
    const data = JSON.parse(f)
        .map((i) => qSet.get(i.topic_id))
        .flatMap((w) => {
            if (!w) return [];
            const m = w.match(regex);
            if (m) {
                return [m[1], m[1] + m[2]];
            }
            return w;
        });
    data.sort((a, b) => {
        const aLower = a.toLowerCase();
        const bLower = b.toLowerCase();

        if (aLower < bLower) return -1;
        if (aLower > bLower) return 1;
        return 0;
    });
    if (!fs.existsSync(path.dirname(output))) {
        fs.mkdirSync(path.dirname(output), { recursive: true });
    }
    fs.writeFileSync(output, data.join("\n"));
}

transFile(".baicizhan", "source/.txt");
