import { readFileSync, writeFileSync } from "node:fs";

const [sourceF, outF] = process.argv.slice(2);

const sL = readFileSync(sourceF).toString().split("\n");
const oL = readFileSync(outF).toString().split("\n");

const newSl = sL.filter((i) => !i.includes(" "));
const newOl = oL.concat(sL.filter((i) => i.includes(" ")));

writeFileSync(sourceF, newSl.join("\n"));
writeFileSync(outF, newOl.join("\n"));
