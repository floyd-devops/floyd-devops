const {execSync} = require('child_process');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

const updateRepoVersion = () => {
  const fileName = path.join(__dirname, '../package.json');
  console.log(fileName);
  let file = require(fileName);
  file.version = execSync('git describe').toString().substr(1).replace('\n', '');
  try {
    fs.writeFileSync(fileName, JSON.stringify(file, null, 2));
    console.log(chalk.blue.bold('Updating repository version'));
    execSync('git add package.json');
    execSync(`git commit -m "chore(release): bump repository version -> ${file.version}"`);
    execSync('git push -u origin master');
  } catch (e) {
    throw e;
  }
};

const releaseAndPublish = (version, force, yes) => {
  console.log('\n########################');
  console.log('RELEASING AND PUBLISHING');
  console.log('########################\n');
  let relPubCommand = `lerna publish ${version.version ? version.version : ''} ${version.isPreRelease ? '--preid next' : ''} --force-publish ${yes ? '--yes' : ''}`;
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
