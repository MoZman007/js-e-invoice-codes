import * as fs from "node:fs/promises";

export const lists = [7143, 4451, 2005, 7161, 4461, 1153, 5305, 1001, 5189];
export const versions = [1, 2, 3, 4, 5];

await fs.writeFile(
	`src/index.ts`,
	`
export * from "./types.js";

	`,
);

const exports: Record<
	string,
	{ import: string; require: string; types: string }
> = {
	".": {
		import: "./dist/esm/index.js",
		require: "./dist/cjs/index.js",
		types: "./dist/esm/index.d.ts",
	},
};

for (const list of lists) {
	for (const version of versions) {
		const source = `https://www.xrepository.de/api/xrepository/urn:xoev-de:${list === 4461 ? "xrechnung" : "kosit"}:codeliste:untdid.${list}_${version}/download/UNTDID_${list}_${version}.json`;

		const response = await fetch(source);
		if (response.status === 404) continue;

		const json: {
			daten: string[][];
		} = await response.json();

		const data = json.daten.map(([code, name, description]) => ({
			code,
			name,
			description: description ?? undefined,
		}));

		const folder = `src/${list}/${version}`;
		await fs.mkdir(folder, { recursive: true });
		await fs.writeFile(
			`${folder}/index.ts`,
			`
			import type { CodeList } from "../../types.js";

			export const UNTDID_${list}_${version}: CodeList = ${JSON.stringify(data)}
			`,
		);

		await fs.appendFile(
			`src/index.ts`,
			`export { UNTDID_${list}_${version} } from "./${list}/${version}/index.js";\n`,
		);

		exports[`./${list}/${version}`] = {
			import: `./dist/esm/${list}/${version}/index.js`,
			require: `./dist/cjs/${list}/${version}/index.js`,
			types: `./dist/esm/${list}/${version}/index.d.ts`,
		};

		console.log(`Generated ${folder}.`);
	}
}

console.log("Generated all code lists successfully.");

const packageJson = JSON.parse(
	(await fs.readFile("./package.json")).toString("utf8"),
);
packageJson.exports = exports;
await fs.writeFile("./package.json", JSON.stringify(packageJson, undefined, 2));
