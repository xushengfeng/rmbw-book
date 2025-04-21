const data: Record<string, string> = JSON.parse(Deno.readTextFileSync("raw/MorphoLEX_en.json"));

const x = new Map<string, string>();

for (const [word, sp] of Object.entries(data)) {
    const w = x.get(sp);
    if (w) {
        if (word.length < w.length) {
            // 排除复数等普通形态变形
            x.set(sp, word);
        }
    } else {
        x.set(sp, word);
    }
}

const nobject: Record<string, string> = {};

for (const [sp, word] of x) {
    nobject[word] = sp;
}

const rootObject: Record<string, string[]> = {};
for (const [word, sp] of Object.entries(nobject)) {
    const root = sp.match(/\(.*?\)/)?.[0];
    if (root) {
        const x = rootObject[root] ?? [];
        x.push(word);
        rootObject[root] = x;
    }
}

Deno.writeTextFileSync("words.json", JSON.stringify(nobject, null, 2));
Deno.writeTextFileSync("roots.json", JSON.stringify(rootObject, null, 2));