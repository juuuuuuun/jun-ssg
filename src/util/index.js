const chalk = require('chalk');
const fs = require('fs');
const yargs = require('yargs');
const { name, version } = require('../../package.json');

const header = (title, cssUrl) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${title}</title>
${cssUrl ? `<link rel="stylesheet" href=${cssUrl}>` : ''}
<meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
<!-- Your generated content here... -->
`;

const footer = `</body>
</html>
`;

const pathDelimiter = '/';
// process.platform !== 'win32' ? '/' : '\\';

const convertToHTML = (fileInfo, cssUrl) => {
    return new Promise((resolve, reject) => {
        fs.promises.readFile(fileInfo, 'utf-8')
            .then(content => {
                if(!content) {
                    throw new Error('file does not exist');
                }
                const delimeter = process.platform === 'win32' ? '\r\n' : '\n';
                let title = "";
                const paragraphs = content.split(/\r?\n\r?\n/).map((e, i) => {
                    if(i === 0) {
                        title = e;
                        return e;
                    }
                    if(i === 1 && !e.startsWith(delimeter)) {
                        title = "";
                    }
                    return e.startsWith('\n') ? `<p>${e.substring(1)}</p>${delimeter}` : `<p>${e}</p>${delimeter}`
                });
                paragraphs[0] = `<h1>${paragraphs[0]}</h1>${delimeter}`;
                const filename = fileInfo.split(pathDelimiter)[fileInfo.split(pathDelimiter).length - 1];
                resolve(header(title ? title : filename, cssUrl) + paragraphs.join("") + footer);
            }).catch(err => {
                throw err;
            });
    });
};

const saveToFile = (html, outputDir = 'dist', filename) => {
    !fs.existsSync(outputDir) && fs.mkdirSync(outputDir);
    fs.promises.writeFile(`${outputDir}${pathDelimiter}${filename}.html`, html)
        .then(() => console.log(chalk.green(`${filename}.html is created!`)))
        .catch(err => console.log(chalk.red(err.message)));
}

exports.convertFilesToHTML = async (filename, cssUrl, outputDir) => {
    let fileInfos = [];
    try{
        if(fs.lstatSync(filename).isDirectory()) {
            const dir = filename.split(pathDelimiter).slice(0, filename.split(pathDelimiter).length).join(pathDelimiter);
            const content = await fs.promises.readdir(filename, 'utf-8');
            fileInfos = content.map(e => `${dir}/${e}`);
        } else {
            fileInfos.push(filename);
        }
        const linkTags = [];
        linkTags.push(`<h1>${filename} - Information Page</h1></n>`);
        for(const file of fileInfos) {
            const name = file.split(pathDelimiter)[file.split(pathDelimiter).length - 1].split('.')[0];
            linkTags.push(`<a href="./${name}.html">${name}</a></br>\n`);
            convertToHTML(file, cssUrl).then(html => {
                saveToFile(html, outputDir, name);
            });
        }
        saveToFile(header('ssg-html', cssUrl) + linkTags.join("") + footer, outputDir, 'index');
    }catch(err) {
        console.log(chalk.red(err.message));
    }
}

exports.getParams = () => yargs
                            .usage('Usage: $0 [options]')
                            .example(`After install my package, ${name} -i 'Silver Blaze.txt'`)
                            .option('i', {
                                alias: 'input',
                                describe: 'Input a file or a directory',
                                type: 'string',
                                required: true
                            })
                            .option('o', {
                                alias: 'output',
                                describe: 'Specify the output directory',
                                type: 'string'
                            })
                            .option('s', {
                                alias: 'stylesheet',
                                describe: 'Import css URL',
                                type: 'string'
                            })
                            .alias('v', 'version')
                            .version('version', `The ${chalk.green(name)}'s version is ${chalk.green(version)}`)
                            .alias('h', 'help')
                            .help('help', `Show usage information`);