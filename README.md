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
const goodFirstIssue = require('good-first-issue')

let log = async () => {
  let issues = await goodFirstIssue('node')
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

### Local Testing

Prior to each release, whoever is releasing should be testing the release locally to ensure that the code is working as expected. This would include either running `npm i -g` or `npm link` in the PR branch and then testing whatever the PR is adding. Ensuring the experience isn't broken is vital.

It is worth noting that we limit the file we publish to npm with the `files` property in [`package.json`](https://github.com/bnb/good-first-issue/blob/master/package.json). This property prevents code that's not explicitly listed from being shipped. We have had a situation where local testing and the published module differed because a PR was merged that added needed code in a directory that wasn't included. So, what works on your machine may not work for the end user.

To test locally, using the modules tests with `npm test` and trying out a few different commands (like the selector, a specific project, a failed project, and so on) is reccomended. For example:

```text
npm i -g # This assumes your current working directory is the module's directory
good-first-issue # run the interactive CLI
good-first-issue react # test the react project
good-first-issue node # test the Node.js project
good-first-issue github # test the GitHub organization, `github`
good-first-issue github/semantic # test the GitHub repo, `github/semantic`
good-first-issue thisisntarealprojectorgithuborg
```

## Contributing

If you are interested in fixing issues and contributing directly to the code base, please see the document [CONTRIBUTING.md](./CONTRIBUTING.md)
