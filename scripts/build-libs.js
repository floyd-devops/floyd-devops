const { execSync } = require('child_process');
const fs = require('fs');
const chalk = require('chalk');
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
    return 1;
  }
  if (bDep.deps.includes(aDep.name)) {
    return -1;
  }
  return 1;
});

const buildLibs = () => {
  console.log('\n#########################');
  console.log('BUILDING LIBS AS PACKAGES');
  console.log('#########################\n');
  buildOrder.forEach(lib => {
    try {
      let buildCommand = 'ng build ' + lib;
      console.log(`> ${chalk.blue(buildCommand)}`);
      execSync(buildCommand, {stdio: 'inherit'});
    } catch (e) {
      throw new Error();
    }
  });
};

module.exports = {
  buildLibs
};




