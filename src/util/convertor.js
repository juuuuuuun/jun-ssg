const chalk = require('chalk');
const fs = require('fs');

const header = (title, cssUrl, lang, theme) => `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<title>${title}</title>
${cssUrl ? `<link rel="stylesheet" href=${cssUrl}>` : ''}
<meta name="viewport" content="width=device-width, initial-scale=1">
${theme}

</head>
<body>
<!-- Your generated content here... -->
`;

const footer = `</body>
</html>
`;

const pathDelimiter = '/';
// process.platform !== 'win32' ? '/' : '\\';

const convertToHTML = (fileInfo, cssUrl, lang, theme) => {
  return new Promise((resolve) => {
    fs.promises
      .readFile(fileInfo, 'utf-8')
      .then((content) => {
        if (!content) {
          throw new Error('file does not exist');
        }

        //based on the os set different type of delimiters(still developing)
        const delimiter = process.platform === 'win32' ? '\r\n' : '\n';
        let title = '';
        //api doesnt work on other user's sysyem so replaced the delimiter to /\r?\n\r?\n/ at split
        const paragraphs = content.split(/\r?\n\r?\n/).map((e, i) => {
          if (i === 0) {
            title = e;
            return e;
          }
          if (i === 1 && !e.startsWith(delimiter)) {
            title = '';
          }
          return e.startsWith('\n')
            ? `<p>${e.substring(1)}</p>${delimiter}`
            : `<p>${e}</p>${delimiter}`;
        });
        //set 0st paragraphs to filename and title.
        paragraphs[0] = `<h1>${paragraphs[0]}</h1>${delimiter}`;
        const filename =
          fileInfo.split(pathDelimiter)[
            fileInfo.split(pathDelimiter).length - 1
          ];
        resolve(
          header(title ? title : filename, cssUrl, lang, theme) +
            paragraphs.join('') +
            footer
        );
      })
      .catch((err) => {
        throw err;
      });
  });
};

//convert MD files to HTML. text that has header 1 will be encased in <h1>...</h1>
const mdToHTML = (fileInfo, cssUrl, lang, theme) => {
  return new Promise((resolve) => {
    fs.promises
      .readFile(fileInfo, 'utf-8')
      .then((content) => {
        if (!content) {
          throw new Error('file does not exist');
        }

        //Find out if the user is running on wins or mac.
        const delimiter = process.platform === 'win32' ? '\r\n' : '\n';

        //Change all of the MD headers to html headers
        const paragraphs = content.split(/\r?\n\r?\n/).map((e) => {
          if (e.startsWith('# ')) {
            return `<h1>${e.substring(2)}</h1>${delimiter}`;
          } else if (e.startsWith('## ')) {
            return `<h2>${e.substring(3)}</h2>${delimiter}`;
          } else if (e.startsWith('### ')) {
            return `<h3>${e.substring(4)}</h3>${delimiter}`;
          } else if (e.startsWith('#### ')) {
            return `<h4>${e.substring(5)}</h4>${delimiter}`;
          } else if (e.startsWith('##### ')) {
            return `<h5>${e.substring(6)}</h5>${delimiter}`;
          } else if (e.startsWith('###### ')) {
            return `<h6>${e.substring(7)}</h6>${delimiter}`;
          } else if (e.startsWith('---')) {
            return `<hr/>${delimiter}`;
          } else if (e.startsWith('```')) {
            return `${e.replace('```', '<xmp>')}${delimiter}`;
          } else if (e.endsWith('```')) {
            return `${e.replace('```', '</xmp>')}${delimiter}`;
          } else {
            return `<p>${e}</p>${delimiter}`;
          }
        });

        const filename =
          fileInfo.split(pathDelimiter)[
            fileInfo.split(pathDelimiter).length - 1
          ];
        resolve(
          header(
            filename.startsWith('.\\')
              ? filename.substring(2, filename.length - 3)
              : filename.substring(0, filename.length - 3),
            cssUrl,
            lang,
            theme
          ) +
            paragraphs.join('') +
            footer
        );
      })
      .catch((err) => {
        throw err;
      });
  });
};

//save the files to "dist" folder
const saveToFile = (html, outputDir, filename) => {
  !fs.existsSync(outputDir) && fs.mkdirSync(outputDir);
  return fs.promises
    .writeFile(`${outputDir}${pathDelimiter}${filename}.html`, html)
    .then(() => console.log(chalk.green(`${filename}.html is created!`)))
    .catch((err) => {
      throw err;
    });
};

async function getParamsData(
  input,
  css,
  language = 'en',
  output,
  config,
  theme
) {
  //for the argv
  theme == 'dark'
    ? (theme = `<style>
		body {
			background-color: #292929;
		}
		h1, h2, h3, h4, h5, h6, b, strong, th, p, a, xmp, code{
			color: #fff;
		}
		</style>`)
    : '';
  if (config) {
    const data = await fs.promises.readFile(config, 'utf-8');
    const parsedData = JSON.parse(data);
    input = parsedData.input ?? input;
    input = input.replace('./', '');
    language = parsedData.lang ?? language;
    css = parsedData.stylesheet ?? css;
    theme =
      parsedData.theme == 'dark'
        ? (theme = `<style>
		body {
			background-color: #292929;
		}
		h1, h2, h3, h4, h5, h6, b, strong, th, p, a, xmp, code{
			color: #fff;
		}
		</style>`)
        : '';
  }
  return {
    input,
    css,
    language,
    output,
    theme,
  };
}

async function getFileData(input) {
  let fileInfos = [];
  //if the input content is folder then set the input value as a folder or not just set file.
  if (fs.lstatSync(input).isDirectory()) {
    const dir = input
      .split(pathDelimiter)
      .slice(0, input.split(pathDelimiter).length)
      .join(pathDelimiter);
    const content = await fs.promises.readdir(input, 'utf-8');
    fileInfos = content.map((e) => `${dir}/${e}`);
  } else {
    fileInfos.push(input);
  }
  return fileInfos;
}

function createIndex({ input, css, language, output, theme }, fileInfos) {
  const linkTags = [];
  linkTags.push(`<h1>${input} - Information Page</h1></n>`);
  for (const file of fileInfos) {
    const [name, ext] = file
      .split(pathDelimiter)[file.split(pathDelimiter).length - 1].split('.');
    linkTags.push(`<a href="./${name}.html">${name}</a></br>\n`);
    //Add to detect if the input file is .md or .txt
    if (ext.match('md')) {
      mdToHTML(file, css, language, theme).then(async (html) => {
        await saveToFile(html, output, name);
      });
    } else {
      convertToHTML(file, css, language, theme).then(async (html) => {
        await saveToFile(html, output, name);
      });
    }
  }

  return saveToFile(
    header('ssg-html', css, language, theme) + linkTags.join('') + footer,
    output,
    'index'
  );
}

//it is working for converting files to html
exports.convertFilesToHTML = async (
  filename,
  cssUrl,
  language = 'en',
  outputDir = 'dist',
  config,
  theme
) => {
  const paramsData = await getParamsData(
    filename,
    cssUrl,
    language,
    outputDir,
    config,
    theme
  );

  const fileInfos = await getFileData(paramsData.input);

  //function part for generating an index file to go to sample pages.
  await createIndex(paramsData, fileInfos);
};
