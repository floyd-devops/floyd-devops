const { getLibAlias } = require('./util');

const { execSync } = require('child_process');
const fs = require('fs');
const chalk = require('chalk');

// const args = process.argv.splice(2, process.argv.length);
const libs = require('./config').libs;

const libsDeps = libs.reduce((obj, lib) => {
  const packageFile = `./libs/${lib}/package.json`;
  if (fs.existsSync(packageFile)) {
    const packageDetails = JSON.parse(fs.readFileSync(packageFile, 'utf8'));
    obj[lib] = {
      name: packageDetails.name,
      deps: Object.keys(packageDetails.peerDependencies)
    };
  }
  return obj;
}, {});

const buildOrder = Object.keys(libsDeps).sort((a, b) => {
  const aDep = libsDeps[a], bDep = libsDeps[b];
  if (aDep.deps.includes(bDep.name)) {
    // console.log(`${aDep.name} requires ${bDep.name}`);
    return 1;
  }
  if (bDep.deps.includes(aDep.name)) {
    // console.log(`${bDep.name} requires ${aDep.name}`);
    return -1;
  }
  // console.log(`${aDep.name} does not require ${bDep.name}`);
  return 1;
});

// console.log(chalk.underline(`Build order: ${buildOrder}`));

const buildLibs = () => {
  console.log('BUILDING LIBS AS PACKAGES\n');
  buildOrder.forEach(lib => {
    try {
      let buildCommand = 'ng build ' + lib;
      console.log(`> ${buildCommand}`);
      // console.log(chalk.blue.bold(`${buildOrder.indexOf(lib) + 1}.${getLibAlias(lib)}`));
      execSync(buildCommand, {stdio: 'inherit'});
      // console.log(chalk.green('SUCCESS'));
    } catch (e) {
      // console.log(chalk.red('FAILED'));
      throw new Error();
    }
  });
};

module.exports = {
  buildLibs
};




