const chalk = require('chalk');
const yargs = require("yargs");
const { name, version } = require("../../package.json");

//link of yeargs you might can find some infos that you need to understand this code https://github.com/yargs/yargs/blob/HEAD/docs/examples.md
exports.getParams = () =>
	yargs
		.usage("Usage: $0 [options]")
		.example(`After install my package, ${name} -i 'Silver Blaze.txt'`)
		.option("i", {
			alias: "input",
			describe: "Input a file or a directory",
			type: "string"
			// required: true
		})
        .option("l", {
			alias: "lang",
			describe: "HTML language attribute",
			type: "string"
		})
		.option("o", {
			alias: "output",
			describe: "Specify the output directory",
			type: "string"
		})
		.option("s", {
			alias: "stylesheet",
			describe: "Import css URL",
			type: "string"
		})
		.option("t", {
			alias: "theme",
			describe: "convert the main theme from light -> dark",
			type: "string"
		})
		.option("c", {
			alias: "config",
			describe: "Read user's options through a config JSon file"
		})
		.alias("v", "version")
		.version(
			"version",
			`The ${chalk.green(name)}'s version is ${chalk.green(version)}`
		)
		.alias("h", "help")
		.help("help", `Show usage information`);
