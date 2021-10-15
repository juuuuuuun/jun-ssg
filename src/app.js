#!/usr/bin/env node
const chalk = require("chalk");
const { convertFilesToHTML, getParams } = require("./util");

async function start() {
	try {
		const { argv } = getParams();
		const {
			input: fileOrDirectory,
			output: outputDir,
			stylesheet: cssUrl,
			config: config,
			lang
		} = argv;
		if(!fileOrDirectory && !config) {
			throw new Error("Please include an input filename or folder");
		  }
		  
		await convertFilesToHTML(fileOrDirectory, cssUrl, lang, outputDir, config);
	} catch (err) {
		console.error(err);
		console.log(chalk.red(err.message));
		process.exit(-1);
	}	
}

start();
