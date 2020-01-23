const chalk = require('chalk');
const yargsParser = require('yargs-parser');
const childProcess = require('child_process');
const {buildLibs} = require('./build-libs');
const {releaseAndPublish} = require('./release-publish-libs');

const parsedArgs = yargsParser(process.argv, {
  boolean: ['force', 'yes', 'dry-run', 'help'],
  alias: {
    f: 'force',
    y: 'yes',
    e: 'dry-run',
    h: 'help'
  }
});

if (!parsedArgs.local && !process.env.GH_TOKEN) {
  console.error('process.env.GH_TOKEN is not set');
  process.exit(1);
}

if (parsedArgs.help) {
  console.log(`
      Usage: yarn floyd-release <version> [options]
      Example: "yarn floyd-release major --force --yes"

      The acceptable values for the version are: major | minor | patch | semantic.
      Version 'semantic' calculates version bump from commits while others are used for fixed versioning.
      Options:
        --force             Bump version and publish all packages regardless of changes
        --yes               Automatic yes on prompt for publishing packages
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
    chalk.red(
    `\nError:\nThe specified version is not valid. You specified: "${parsedVersion.version}"`
    )
  );
  console.error(
    `Please run "yarn floyd-release --help" for details on the acceptable version format.\n`
  );
  return process.exit(1);
} else {
  console.log('Parsed version: ', JSON.stringify(parsedVersion));
}

//  BUILD
buildLibs();

// RELEASE & PUBLISH
releaseAndPublish(parsedVersion.version, parsedArgs.force, parsedArgs. yes);

// DONE
console.log(chalk.green.bold('\n### SUCCESSFULLY RELEASED AND PUBLISHED ALL PACKAGES ###'));




