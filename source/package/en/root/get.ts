import xlsx from "xlsx";

const xx = xlsx.read(Deno.readFileSync("raw/MorphoLEX_en.xlsx").buffer);

console.log(xx.SheetNames);

const xList = xx.SheetNames.slice(2, -4);
console.log(xList);

const x: Record<string, string> = {};

for (const xName of xList) {
    const sheet = xx.Sheets[xName];
    const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });
    const [header, ...rows] = data;
    for (const row of rows) {
        const key = (row[1]as string).toLocaleLowerCase();
        const value = row[5];
        if (key && value) {
            x[key] = value;
        }
    }
}

Deno.writeTextFileSync("raw/MorphoLEX_en.json", JSON.stringify(x, null, 2));
