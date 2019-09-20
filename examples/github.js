const goodFirstIssue = require('../')

let log = async () => {
  let issues = await goodFirstIssue('github')
  if (issues) {
    console.log(
      'There are ' +
        issues.length +
        ' open Good First Issues in the GitHub organization.'
    )
    issues.forEach(function (issue) {
      console.log(
        '    ' +
          issue.url
            .toString()
            .slice(19, issue.url.toString().indexOf('/issue')) +
          '#' +
          issue.pr +
          ': ' +
          issue.title
      )
    })
  }
}

log()
