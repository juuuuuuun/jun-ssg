#!/usr/bin/env node
const chalk = require('chalk');
// const { convertFilesToHTML, getParams } = require('./util');
const util = require('./util');

async function start() {
  const params = util.getParams();
  const {
    input: fileOrDirectory,
    output: outputDir,
    stylesheet: cssUrl,
    config: config,
    lang,
    theme,
  } = params.argv;
  if (!fileOrDirectory && !config) {
    throw new Error('Please include an input filename or folder');
  }

  await util.convertFilesToHTML(
    fileOrDirectory,
    cssUrl,
    lang,
    outputDir,
    config,
    theme
  );
}

start();

module.exports = {
  start,
};
