const {execSync} = require('child_process');

const releaseAndPublish = (version, force, yes) => {
  console.log('\n########################');
  console.log('RELEASING AND PUBLISHING');
  console.log('########################\n');
  let relPubCommand = `lerna publish --conventional-commits ${version} ${force ? '--force-publish' : ''} ${yes ? '--yes' : ''}`;
  console.log(`> ${relPubCommand}`);
  try {
    execSync(relPubCommand , {stdio: 'inherit'});
  } catch (e) {
    throw e;
  }
};

module.exports = {
  releaseAndPublish
};
