const goodFirstIssue = require('..')
const nock = require('nock')
const localProjects = require('./projects.json')

const options = {
  projects: localProjects
}

describe('goodFirstIssue', () => {
  let items

  beforeEach(() => { // set up mock response
    items = [{
      title: 'fooTitle',
      number: 123,
      labels: 'fooLabels',
      state: 'fooState',
      repository_url: 'fooRepoUrl',
      html_url: 'fooHtmlUrl',
      assignee: null,
      assignees: 'fooAssignees',
      locked: false
    }]

    // "Mock" network requests to the Search API
    nock('https://api.github.com').get(/^\/search\/issues\?/).reply(200, { items })
  })


  it('returns the expected issues', async () => {
    const actual = await goodFirstIssue('node', options)
    expect(actual).toEqual([{
      assignee: null,
      assignees: 'fooAssignees',
      labels: 'fooLabels',
      locked: false,
      pr: 123,
      repo: 'fooRepoUrl',
      state: 'fooState',
      title: 'fooTitle',
      url: 'fooHtmlUrl',
    }])
  })

  it('returns the expected issues from the GitHub organization', async() => {
    const actual = await goodFirstIssue('github')
    
    expect(actual).toEqual([{
      assignee: null,
      assignees: 'fooAssignees',
      labels: 'fooLabels',
      locked: false,
      pr: 123,
      repo: 'fooRepoUrl',
      state: 'fooState',
      title: 'fooTitle',
      url: 'fooHtmlUrl'
    }])
  })

  it('authenticates request when options.auth is set', async () => {
    const actual = await goodFirstIssue(
      'node',
      Object.assign(
        {
          auth: 'secret 123'
        },
        options
      )
    )

    // "Mock" network requests with token authentication to the Search API
    nock('https://api.github.com', {
      reqheaders: {
        authorization: 'token secret123'
      }
    })
      .get(/^\/search\/issues\?/)
      .reply(200, { items })

    expect(actual).toEqual([
      {
        assignee: null,
        assignees: 'fooAssignees',
        labels: 'fooLabels',
        locked: false,
        pr: 123,
        repo: 'fooRepoUrl',
        state: 'fooState',
        title: 'fooTitle',
        url: 'fooHtmlUrl'
      }
    ])
  })
})