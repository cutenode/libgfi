const search = require('./lib/search')

/**
 * @typedef { object } Projects - An object of project definitions
 * @property { string } name - Human-friendly name
 * @property { string } q - Exact query to search for on GitHub
 * @property { string } description - Human-friendly description of the project
 */

/**
 * @typedef { object } Options - special additional options that you can pass
 * @property { Projects } projects - an object of project definitions
 * @property { string } auth - a string that contains a GitHub Personal Access Token
 */

/**
 * @param { string } project - one of the following:
 *                               - the name of a GitHub organization ('[org]'),
 *                               - a GitHub organization and repo ('[org]/[repo]'),
 *                               - a project name ('[name]') from the passed projects JSON
 * @param { Options } [options] - options for the module
 */

module.exports = (project, options) => {
  if (options === undefined) {
    options = {}
  }

  if (options.projects !== undefined && project in options.projects) {
    return search(options.projects[project].q, options.auth, options.sort, options.order)
  } else {
    return search(`${project.includes('/') ? 'repo' : 'org'}:${project} state:open label:"good first issue"`, options.auth)
  }
}
