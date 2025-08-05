import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts"],
	format: ["cjs", "esm"],
	bundle: false,
	splitting: false,
	sourcemap: true,
	dts: true,
	clean: true,
});
