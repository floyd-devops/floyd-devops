const yargsParser = require('yargs-parser');
const releaseIt = require('release-it');
const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');
const {execSync} = require('child_process');

const parsedArgs = yargsParser(process.argv, {
  boolean: ['exact', 'help'],
  alias: {
    e: 'dry-run',
    h: 'help'
  }
});

console.log('parsedArgs', parsedArgs);

if (!parsedArgs.local && !process.env.GH_TOKEN) {
  console.error('process.env.GH_TOKEN is not set');
  process.exit(1);
}

if (parsedArgs.help) {
  console.log(`
      Usage: yarn floyd-release <version> [options]
      Example: "yarn floyd-release major|minor|patch"
      The acceptable format for the version number is:
      {number}.{number}.{number}[-{alpha|beta|rc}.{number}]
      The subsection of the version number in []s is optional, and, if used, will be used to
      mark the release as "prerelease" on GitHub, and tag it with "next" on npm.
      Options:
        --dry-run           Do not touch or write anything, but show the commands
        --help              Show this message
    `);
  process.exit(0);
}

console.log('> git fetch --all');
childProcess.execSync('git fetch --all', {
  stdio: [0, 1, 2]
});

function parseVersion(version) {
  return {
    version,
    isValid: version === 'major' || version === 'minor' || version === 'patch'
  };
}

const parsedVersion = parseVersion(parsedArgs._[2]);
if (!parsedVersion.isValid) {
  console.error(
    `\nError:\nThe specified version is not valid. You specified: "${parsedVersion.version}"`
  );
  console.error(
    `Please run "yarn floyd-release --help" for details on the acceptable version format.\n`
  );
  return process.exit(1);
} else {
  console.log('Parsed version: ', JSON.stringify(parsedVersion));
}

//  BUILD
console.log('Executing build script:');
// const buildCommand = `./scripts/package.sh ${parsedVersion.version} ${cliVersion} ${typescriptVersion} ${prettierVersion}`;
const buildCommand = 'node scripts/build-libs.js';
console.log(`> ${buildCommand}`);
childProcess.execSync(buildCommand, {
  stdio: [0, 1, 2]
});

// RELEASE
// execSync('lerna publish --conventional-commits --force-publish');
try {
  execSync(`lerna publish --conventional-commits ${parsedVersion.version}`, {stdio: 'inherit'});
} catch (e) {
  throw e;
}


const DRY_RUN = !!parsedArgs['dry-run'];




