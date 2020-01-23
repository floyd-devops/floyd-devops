const {execSync} = require('child_process');
const chalk = require('chalk');
const {getRepoName} = require('../util');
const fs = require('fs');

const updateRepoVersion = () => {
  const fileName = '../../package';
  let file = require(fileName);
  file.version = execSync('git describe').toString().substr(1);

  fs.writeFile(fileName, JSON.stringify(file), function (err) {
    if (err) return console.log(err);
  });
  execSync(`git commit -a -m "chore(release): update repository version -> ${file.version}"`);
  execSync('git push -u origin master');
};

const releaseAndPublish = (version, force, yes) => {
  console.log('\n########################');
  console.log('RELEASING AND PUBLISHING');
  console.log('########################\n');
  let relPubCommand = `lerna publish --conventional-commits ${version === 'semantic' ? '' : version} ${force ? '--force-publish' : ''} ${yes ? '--yes' : ''}`;
  console.log(`> ${relPubCommand}`);
  try {
    execSync(relPubCommand , {stdio: 'inherit'});
    updateRepoVersion();
    console.log(chalk.green.bold('\n### SUCCESSFULLY RELEASED AND PUBLISHED ALL PACKAGES ###'));
  } catch (e) {
    throw e;
  }
};

module.exports = {
  releaseAndPublish
};
