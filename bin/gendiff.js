#!/usr/bin/env node

import { Command } from 'commander';
import gendiff from '../src/index.js';
import stylish from '../src/formatters/stylish.js';
import json from '../src/formatters/index.js';
import plain from '../src/formatters/plain.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .version('0.0.1')
  .option('-f, --format [type]', 'output format (default: "stylish")')
  .action((filepath1, filepath2, options) => {
    const { format } = options;
    const formatName = ((formatType) => {
      if (formatType === 'json') {
        return json;
      }
      if (formatType === 'plain') {
        return plain;
      }
      return stylish;
    })(format);
    console.log(gendiff(filepath1, filepath2, formatName));
  });

program.parse();
