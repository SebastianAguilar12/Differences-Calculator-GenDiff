#!/usr/bin/env node

import { Command } from 'commander';
import gendiff from './src/index.js';
import stylish from './src/formatters/stylish.js';
import json from './src/formatters/index.js';
import plain from './src/formatters/plain.js';

const getFormatter = (format) => {
  if (format === undefined) {
    return stylish;
  }
  if (typeof format === 'function') {
    return format;
  }
  switch (format) {
    case 'stylish':
      return stylish;
    case 'json':
      return json;
    case 'plain':
      return plain;
    default:
      return stylish;
  }
};

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .version('0.0.1')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    const { format } = options;
    const formatName = getFormatter(format);
    const diff = gendiff(filepath1, filepath2, formatName);
    console.log(diff);
  });

if (process.env.NODE_ENV !== 'test') {
  program.parse(process.argv);
}

export default function execApp(filepath1, filepath2, format = 'stylish') {
  const formatter = getFormatter(format);
  const result = gendiff(filepath1, filepath2, formatter);
  return result;
}
