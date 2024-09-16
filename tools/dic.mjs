import { dicParse } from "../../rmbw2/dic/dist/rmbw-dic.es.js";

import fs from "node:fs";

const p = process.argv[2];

const dic = fs.readFileSync(p).toString();

fs.writeFileSync(p, JSON.stringify(dicParse(dic).export(), null, 2));
