const { execSync } = require('child_process');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

const getLatestTagVersion = () => {
  return execSync('git describe')
    .toString()
    .substr(1)
    .replace('\n', '');
};

const updateRepoVersion = () => {
  const fileName = path.join(__dirname, '../package.json');
  console.log(fileName);
  let file = require(fileName);
  file.version = getLatestTagVersion();
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
  let relPubCommand = `lerna publish ${
    version.version && version.version !== 'graduate' ? version.version : ''
  } ${version.isGraduate ? '--conventional-graduate' : ''} ${
    version.isPreRelease ? '--preid next --dist-tag next' : ''
  } --force-publish ${yes ? '--yes' : ''}`;
  console.log(`> ${relPubCommand}`);
  try {
    const oldVersion = getLatestTagVersion();
    execSync(relPubCommand, { stdio: 'inherit' });
    const newVersion = getLatestTagVersion();
    if (oldVersion !== newVersion) {
      updateRepoVersion();
      console.log(chalk.green.bold('\n### SUCCESSFULLY RELEASED AND PUBLISHED ALL PACKAGES ###'));
    } else {
      console.log(chalk.blue('### Publish Aborted ###'));
    }
  } catch (e) {
    throw e;
  }
};

module.exports = {
  releaseAndPublish
};
