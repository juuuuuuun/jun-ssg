#!/usr/bin/env node
const yargs = require('yargs');
const chalk = require('chalk');
const { name, version } = require('../package.json');
const fs = require('fs');
const path = require('path');

try {
    const { argv } = yargs
        .usage('Usage: $0 [options]')
        .example(`${name} src/$0 -f 'Silver Blaze.txt'`)
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
    
    const { input: fileOrDirectory }  = argv;
    if(!fileOrDirectory) {
        throw new Error('Please input filename');
    }
    const dir = '/sample/Sherlock-Holmes-Selected-Stories';
    console.log(path.join(__dirname, `../${dir}/${fileOrDirectory}`));
    fs.promises.readFile(path.join(__dirname, `../${dir}/${fileOrDirectory}`), 'utf-8')
        .then(content => {
                if(!content) {
                    throw new Error('file does not exist');
                }
                const delimiter = process.platform === 'win32' ? '\r\n' : '\n';
                const paragraphs = content.split(delimiter + delimiter ).map((e, i) => {
                    if(i === 0 ){
                        return e;
                    }
                    return e.startsWith(delimiter) ? `\t\t<p>${e.substring(1)}</p>${delimiter}` : `\t\t<p>${e}</p>${delimiter}`});
                    let title;
                    title = paragraphs[0];
                    paragraphs[0] = `\t\t<h1>${paragraphs[0]}</h1>${delimiter}`
                console.log(paragraphs);

                const header = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${title}</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
<!-- Your generated content here... -->
`                
                const footer = `</body>
</html>
`

                fs.promises.writeFile('test.html', header + paragraphs.join("") + footer)
                .then(res => console.log(res))
                .catch(err => { 
                    console.log(chalk.red(err.message));
                });
        }).catch(err => {
            console.log(chalk.red(err.message));        
        });
} catch(err) {
    console.log(chalk.red(err.message));
}
