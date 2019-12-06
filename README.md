# libgfi

A module to surface GitHub issues labeled "Good First Issue" (and similar variants) for any GitHub organization, repo, or pre-defined project.

## Prerequisites

To use Good First Issue, you'll need to have a few things installed:

- Node.js 8.0.0 or above
  - If you need to install Node.js, you can download it from the [official downloads page](https://nodejs.org/en/download/)
  - If you want to use a dynamic version manager, you can use something like nvm [on macOS, Linux, and WSL](https://gist.github.com/d2s/372b5943bce17b964a79).
- npm 5.0.0 or above
  - If you already have Node.js 8.0.0 or above, you will have npm 5.0.0 or above.
  - If you need to update your npm CLI, run `npm i -g npm`

## Usage

Installation:

```bash
npm install libgfi
```

An example of how libgfi can be used in a Node.js application:

```js
const gfi = require('libgfi')

let log = async () => {
  let issues = await gfi('microsoft') // search the 'microsoft' GitHub organization
  issues.forEach(function (issue) {
    console.log('#' + issue.pr + ': ' + issue.title)
  })
}

log()
```

Search a specific repository:

```js
const gfi = require('libgfi')

gfi('golang/dep')
  .then((issues) => {
    console.log(issues)
  })
  .catch((error) => {
    console.error(error)
  })
```
Passing in a custom set of organizations to search and using sort and order:

```js
const gfi = require('libgfi')

const options = {
  projects: {
    node: {
      name: 'Node.js', // Human readable name
      q: 'org:nodejs is:issue is:open label:"good first issue"', //GitHub search query
      description: "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine." // Human readable description
    }
  },
  sort: 'comments',
  order: 'asc'
}

let log = async () => {
  console.log(await goodFirstIssue('node', options)) // search the 'node' property
}

log()
```
The valid options available in sort and order can be found at [Github's documentation](https://developer.github.com/v3/search/#search-issues-and-pull-requests). Passing any of the allowed parameters as strings should work. 

Passing in GitHub credentials (see Octokit's [authentication documentation](https://octokit.github.io/rest.js/#authentication) for more details) for authentication to exponentially increase the rate limit:

```js
const gfi = require('libgfi')

const options = {
  auth: '<replace_with_your_github_secret_personal_access_token>' // or username/password + 2fa, or app installation access token
}

let log = async () => {
  let issues = await gfi('microsoft', options) // search the 'microsoft' GitHub organization
  issues.forEach(function (issue) {
    console.log('#' + issue.pr + ': ' + issue.title)
  })
}

log()
```

### Examples

Good First Issue has an [examples/](./examples) directory, in which we try to maintain various examples of how Good First Issue can be used as a module. If you'd like to contribute to the examples, please don't hesitate to submit a PR! 🤗

### Adding New Projects: More Information

You can pull your queries directly from a standard GitHub search! If you want to build something a bit more complex, you can use the advanced search tool if you want to build more specific custom queries: [https://github.com/search/advanced](https://github.com/search/advanced)

As a CLI, `good-first-issue` uses the Commander.js CLI framework. If you want to better understand how our CLI is built, commander.js is pretty [well documented](https://github.com/tj/commander.js/). Also used are Chalk for terminal coloring and [boxen](https://github.com/sindresorhus/boxen) to simplify the output container implementation.

## Release Process

Good First Issue follows a relatively strict release process intended to ensure the spice flows.

### Versioning

| Semantic Version | Type | Reason |
|-------------------|-------------------------------------------------------|--------------------------------------------------------------------------------------------------------------|
| Major (**x**.x.x) | Breaking changes and non-trivial upgrades | Ensuring that end-users can rely on Good First Issue not breaking however they're consuming it |
| Minor (x.**x**.x) | Project additions, other feature additions | Following the SemVer standard, project additions and feature additions are backwards-compatible enhancements. We generally try to ship one addition per Minor. |
| Patch (x.x.**x**) | Bug fixes, minor enhancements to metadata and content | Tiny, hardly visible fixes to improve UX/DX or fix the module |

## Labels and Milestones

We use both GitHub Labels and Milestones to track releases. Since project additions count as a minor release, we prefer to space those out and ship them individually rather than shipping many at once. This pace may be revised later, but for now, it introduces the need for a release queue and setting things up to be released ahead of them actually being released.

We use the release queue [label](https://github.com/bnb/good-first-issue/pulls?q=is%3Apr+is%3Aopen+sort%3Aupdated-desc) and [milestone](https://github.com/bnb/good-first-issue/milestone/16) to queue up PRs that have been reviewed and are ready to be released.

Once a PR is ready to be released, a milestone will be added that correlates to the SemVer version it will be released in. Ideally this will _eventually_ be used for changelog tracking but for now it's just a good way to keep organized. To keep things tidy, once a new version has shipped the milestone will be closed out.

## Contributing

If you are interested in fixing issues and contributing directly to the code base, please see the document [CONTRIBUTING.md](./CONTRIBUTING.md)
