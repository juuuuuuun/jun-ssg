#!/usr/bin/env node
const chalk = require('chalk');
const path = require('path');
const { convertFilesToHTML, getParams } = require('./util');

try {
    const { argv } = getParams();
    
    const { input: fileOrDirectory, output: outputDir, stylesheet: cssUrl }  = argv;
    if(!fileOrDirectory) {
        throw new Error('Please input filename');
    }
    const dir = '/sample';
    convertFilesToHTML(path.join(__dirname, `../${dir}/${fileOrDirectory}`), cssUrl, outputDir);
} catch(err) {
    console.log(chalk.red(err.message));
}
