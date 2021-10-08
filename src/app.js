#!/usr/bin/env node
const chalk = require("chalk");
const path = require("path");
const { convertFilesToHTML, getParams } = require("./util");

try {
	const { argv } = getParams();
	const {
		input: fileOrDirectory,
		output: outputDir,
		stylesheet: cssUrl,
		config: config
	} = argv;
	if (!fileOrDirectory && !config) {
		throw new Error("Please input filename or config file");
	}
	convertFilesToHTML(fileOrDirectory, cssUrl, outputDir, config);
} catch (err) {
	console.log(chalk.red(err.message));
}
