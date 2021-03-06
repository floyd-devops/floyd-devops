const chalk = require('chalk');
const yargsParser = require('yargs-parser');
const childProcess = require('child_process');
const { buildLibs } = require('./package-builder');
const { releaseAndPublish } = require('./package-publisher');

const parsedArgs = yargsParser(process.argv, {
  boolean: ['yes', 'dry-run', 'help'],
  alias: {
    // f: 'force',
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
    Example: "yarn floyd-release major --yes"

    Specifying version is not required as it will be calculated from commits.
    The acceptable values for the version are: major | minor | patch | next | graduate | from-git | from-package.

    Options:
      --yes               Automatic yes on prompt for publishing packages
      --help              Show this message
    `);
  process.exit(0);
}

console.log('> git fetch --all');
childProcess.execSync('git fetch --all', {
  stdio: [0, 1, 2]
});

function parseVersion(version) {
  const validVersions = [
    'major',
    'minor',
    'patch',
    'next',
    'graduate',
    'from-git',
    'from-package',
    undefined
  ];
  return {
    version,
    isValid: validVersions.indexOf(version) !== -1,
    isPreRelease: version !== undefined && version.startsWith('pre'),
    isGraduate: version === 'graduate'
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
}

//  BUILD
buildLibs();

// RELEASE & PUBLISH
releaseAndPublish(parsedVersion, parsedArgs.yes);
