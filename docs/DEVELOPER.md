# Building and Testing Floyd-ng

This document describes how to set up your development environment to build and test Floyd-ng.
It also explains the basic mechanics of using `git`, `node`, and `yarn`.

- [Prerequisite Software](#prerequisite-software)
- [Getting the Sources](#getting-the-sources)
- [Installing NPM Modules](#installing-npm-modules)
- [Building](#building)
- [Running Tests Locally](#running-tests-locally)
- [Formatting your Source Code](#formatting-your-source-code)
- [Linting/verifying your Source Code](#lintingverifying-your-source-code)

See the [contribution guidelines](https://github.com/angular/angular/blob/master/CONTRIBUTING.md)
if you'd like to contribute to Floyd-ng.

## Prerequisite Software

Before you can build and test Angular, you must install and configure the
following products on your development machine:

- [Git](http://git-scm.com) and/or the **GitHub app** (for [Mac](http://mac.github.com) or
  [Windows](http://windows.github.com)); [GitHub's Guide to Installing
  Git](https://help.github.com/articles/set-up-git) is a good source of information.

- [Node.js](http://nodejs.org), (version specified in the engines field of [`package.json`](../package.json)) which is used to run a development web server,
  run tests, and generate distributable files.

- [Yarn](https://yarnpkg.com) (version specified in the engines field of [`package.json`](../package.json)) which is used to install dependencies.

## Getting the Sources

Fork and clone the Angular repository:

1. Login to your GitHub account or create one by following the instructions given
   [here](https://github.com/signup/free).
2. [Fork](http://help.github.com/forking) the [main floyd-devops
   repository](https://github.com/floyd-devops/floyd-devops).
3. Clone your fork of the floyd-ng repository and define an `upstream` remote pointing back to
   the floyd-ng repository that you forked in the first place.

```shell
# Clone your GitHub repository:
git clone git@github.com:<github username>/floyd-devops.git

# Go to the repo directory:
cd floyd-devops

# Add the main floyd-devops repository as an upstream remote to your repository:
git remote add upstream https://github.com/floyd-devops/floyd-devops.git
```

## Installing NPM Modules

Next, install the JavaScript modules needed to build and test Floyd-ng:

```shell
# Install project dependencies (package.json)
yarn install
```

## Building

To build packages(libs) run:

```shell
yarn floyd:build
```

- Results are put in the `dist/libs` folder.

## Running Tests Locally

**...TODO...**

All the tests are executed on our Continuous Integration infrastructure. PRs can only be
merged if the code is formatted properly and all tests are passing.

<a name="clang-format"></a>

## Formatting your source code

Angular uses [prettier](https://prettier.io/) to format the source code.
If the source code is not properly formatted, the CI will fail and the PR cannot be merged.

You can automatically format your code by running:

```shell
$ yarn format:write
```

A better way is to set up your IDE to format the changed file on each file save.

### VS Code

...TODO

### WebStorm

...TODO

## Linting/verifying your Source Code

You can check that your code is properly formatted and adheres to coding style by running:

```shell
$ yarn format:check && yarn lint
```
