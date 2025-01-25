import { Command } from 'commander';
import gendiff from './src/index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .version('0.0.1')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    console.log(gendiff(filepath1, filepath2));
  });

program.parse();
