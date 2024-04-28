const fs = require("fs");

const [sourceF, outF] = process.argv.slice(2);

const sL = fs.readFileSync(sourceF).toString().split("\n");
const oL = fs.readFileSync(outF).toString().split("\n");

const newSl = sL.filter((i) => !i.includes(" "));
const newOl = oL.concat(sL.filter((i) => i.includes(" ")));

fs.writeFileSync(sourceF, newSl.join("\n"));
fs.writeFileSync(outF, newOl.join("\n"));
