#!/usr/bin/env node
const yargs = require('yargs');
const chalk = require('chalk');
const { name, version } = require('../package.json');

try {
    const { argv } = yargs
        .usage('Usage: $0 [options]')
        .example(`$0 -f 'Silver Blaze.txt'`)
        .option('i', {
            alias: 'input',
            describe: 'Input a file or a directory',
            type: 'string',
            required: true
        })
        .alias('v', 'version')
        .version('version', `The ${chalk.green(name)}'s version is ${chalk.green(version)}`)
        .alias('h', 'help')
        .help('help', `Show usage information`);
    
    const { input }  = argv;
    if(!input) {
        throw new Error('Please input filename');
    }
    console.log("My file is " + input);    
} catch(err) {
    console.log(chalk.red(err.message));
}
