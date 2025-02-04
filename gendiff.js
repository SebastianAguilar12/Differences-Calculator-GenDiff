import { Command } from 'commander';
import gendiff from './src/index.js';
import * as formatter from './formatters/index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .version('0.0.1')
  .option('-f, --format [type]', 'output format (default: "stylish")')
  .action((filepath1, filepath2, options) => {
    const { format } = options;
    let formatName = '';
    switch (format) {
      case 'plain':
        formatName = formatter.plain;
        break;
      case 'json':
        formatName = formatter.json;
        break;
      default:
        formatName = formatter.stylish;
        break;
    }
    console.log(gendiff(filepath1, filepath2, formatName));
  });

program.parse();
