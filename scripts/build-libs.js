const {getLibAlias} = require('./util');
const {execSync} = require('child_process');
const chalk = require('chalk');


// build order for libs
const libs = [
  'core',
  'common',
  'components'
];

console.log(chalk.blue.bold('---------------------'));
console.log(chalk.blue.bold(' BUILDING PACKAGES'));
console.log(chalk.blue.bold('---------------------\n'));
// console.log();


libs.forEach(lib => {
  try {
    console.log(chalk.blue.underline.bold(`${libs.indexOf(lib) + 1}.${getLibAlias(lib)}`));
    execSync('ng build ' + lib);
    console.log(chalk.green('SUCCESS'));
  } catch (e) {
    console.log(chalk.red('FAILED'));
    throw new Error();
  }

});

