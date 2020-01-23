const pjson = require('../package.json');

const getRepoName = () => pjson.name;
const getRepoVersion = () => pjson.version;
const getLibAlias = (lib) => `@${getRepoName()}/${lib}`;

module.exports = {
  getRepoName,
  getRepoVersion,
  getLibAlias
};
