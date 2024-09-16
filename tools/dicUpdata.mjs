import { dicParse } from "../../rmbw2/dic/dist/rmbw-dic.es.js";
import { getIndex, writeIndex, getFile } from "./until.mjs";

const index = getIndex();

for (const b of index.books.filter((b) => b.type === "dictionary")) {
	const dic = dicParse(getFile(`${b.sections[0].path}`).toString());
	b.language = dic.meta.lang;
	b.name = dic.meta.name;
	b.id = dic.meta.id;
}

writeIndex(index);
