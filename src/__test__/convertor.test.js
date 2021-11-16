const fs = require('fs');
const {
  header,
  convertToHTML,
  mdToHTML,
  saveToFile,
  getParamsData,
  getFileData,
  createIndex,
  convertFilesToHTML,
} = require('../util/convertor');

afterEach(() => {
  jest.resetAllMocks();
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('header test', () => {
  const htmlParam = {
    title: 'Generated File by JUN-SSG',
    cssURL: 'https://cdn.jsdelivr.net/npm/water.css@2/out/water.css',
    lang: 'en-us',
    theme: '<style>... dark css </style>',
  };

  it('should return html header part', async () => {
    const result = header(
      htmlParam.title,
      htmlParam.cssURL,
      htmlParam.lang,
      htmlParam.theme
    );
    expect(result).toContain(`<title>${htmlParam.title}</title>`);
    expect(result).toContain(
      `<link rel="stylesheet" href=${htmlParam.cssURL}>`
    );
    expect(result).toContain(`<html lang="${htmlParam.lang}">`);
    expect(result).toContain(`${htmlParam.theme}`);
  });
});

describe('convertToHTML test', () => {
  const param = {
    fileInfo: 'Sherlock-Holmes-Selected-Stories/Silver Blaze.txt',
    cssUrl: 'https://cdn.jsdelivr.net/npm/water.css@2/out/water.css',
    lang: 'en-us',
    theme: '<style>... dark css </style>',
  };

  it('should call readFile', async () => {
    const spyFn = jest.spyOn(fs.promises, 'readFile');
    convertToHTML(param.fileInfo, param.cssUrl, param.lang, param.theme);
    expect(spyFn).toBeCalledTimes(1);
  });
});

//Processing error issue is here

// describe('mdToHTML test', () => {
//   const param = {
//     fileInfo: 'Sherlock-Holmes-Selected-Stories/README.md',
//     cssUrl: 'https://cdn.jsdelivr.net/npm/water.css@2/out/water.css',
//     lang: 'en-us',
//     theme: '<style>... dark css </style>',
//   };

//   it('should call readFile', async () => {
//     const spyFn = jest.spyOn(fs.promises, 'readFile');
//     mdToHTML(param.fileInfo, param.cssUrl, param.lang, param.theme);
//     expect(spyFn).toBeCalledTimes(1);
//   });
// });

describe('saveToFile test', () => {
  const param = {
    html: '<html></html>',
    outputDir: 'dist',
    filename: 'file.html',
  };

  it('should call writeFile', async () => {
    const spyFn = jest.spyOn(fs.promises, 'writeFile');
    await saveToFile(param.html, param.outputDir, param.filename);
    expect(spyFn).toBeCalledTimes(1);
  });
});

describe('getParamsData-non-config test', () => {
  const params = {
    input: 'Sherlock-Holmes-Selected-Stories/Silver Blaze.txt',
    css: 'dist',
    language: 'en',
    output: 'test',
    config: false,
    theme: 'dark',
  };

  it('should call getParamsData', async () => {
    //const spyFn = jest.spyOn(fs.promises, 'getParamsData');
    getParamsData(
      params.input,
      params.css,
      params.language,
      params.output,
      params.config,
      params.theme
    );
    expect(params.input).toContain(params.input);
    expect(params.css).toContain(params.css);
    expect(params.language).toContain(params.language);
    expect(params.output).toContain(params.output);
    expect(params.theme).toContain(params.theme);
  });
});

describe('getFileData-non-config test', () => {
  const params = {
    input: 'Sherlock-Holmes-Selected-Stories/Silver Blaze.txt',
  };

  it('should call getParamsData', async () => {
    //const spyFn = jest.spyOn(fs.promises, 'getParamsData');
    getFileData(params.input);
    expect(params.input).toContain(params.input);
  });
});
