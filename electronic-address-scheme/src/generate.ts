import * as fs from "node:fs/promises";

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

for (const version of versions) {
	const source = `https://www.xrepository.de/api/xrepository/urn:xoev-de:kosit:codeliste:eas_${version}/download/EAS_${version}.json`;

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

	const folder = `src/${version}`;
	await fs.mkdir(folder, { recursive: true });
	await fs.writeFile(
		`${folder}/index.ts`,
		`
			import type { CodeList } from "../types.js";

			export const EAS_${version}: CodeList = ${JSON.stringify(data)}
			`,
	);

	await fs.appendFile(
		`src/index.ts`,
		`export * from "./${version}/index.js";\n`,
	);

	exports[`./${version}`] = {
		import: `./dist/esm/${version}/index.js`,
		require: `./dist/cjs/${version}/index.js`,
		types: `./dist/esm/${version}/index.d.ts`,
	};

	console.log(`Generated ${folder}.`);
}

console.log("Generated all code lists successfully.");

const packageJson = JSON.parse(
	(await fs.readFile("./package.json")).toString("utf8"),
);
packageJson.exports = exports;
await fs.writeFile("./package.json", JSON.stringify(packageJson, undefined, 2));
