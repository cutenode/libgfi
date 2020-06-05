const goodFirstIssue = require('..')
const nock = require('nock')
const localProjects = require('./projects.json')

const options = {
  projects: localProjects
}

describe('goodFirstIssue', () => {
  let items

  beforeAll(() => {
    // this Date.now() is this date: 2020-06-05T18:49:18.644Z
    jest.spyOn(Date, 'now').mockImplementation(() => 1591382958644)
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

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
      locked: false,
      created_at: '2020-06-01T11:00:00Z'
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
      daysOpened: 4
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
      url: 'fooHtmlUrl',
      daysOpened: 4
    }])
  })
})
