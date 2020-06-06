let issuesAndPullRequests
let search

beforeAll(() => {
  // this Date.now() is this date: 2020-06-05T18:49:18.644Z
  jest.spyOn(Date, 'now').mockImplementation(() => 1591382958644)
})

afterAll(() => {
  jest.clearAllMocks()
})

beforeEach(() => {
  jest.resetModules()
  jest.restoreAllMocks()
  jest.resetAllMocks()
  issuesAndPullRequests = jest.fn()
  jest.doMock('@octokit/rest', () => () => {
    return {
      search: {
        issuesAndPullRequests
      }
    }
  })
  search = require('../lib/search')
})

test('should return filtered issues if there is only one page', () => {
  const items = [
    {
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
    },
    {
      title: 'barTitle',
      number: 123,
      labels: 'barLabels',
      state: 'barState',
      repository_url: 'barRepoUrl',
      html_url: 'barHtmlUrl',
      assignee: 'barAssignee',
      assignees: 'barAssignees',
      locked: false,
      created_at: '2020-06-01T11:00:00Z'
    },
    {
      title: 'bazTitle',
      number: 123,
      labels: 'bazLabels',
      state: 'bazState',
      repository_url: 'bazRepoUrl',
      html_url: 'bazHtmlUrl',
      assignee: null,
      assignees: 'bazAssignees',
      locked: true,
      created_at: '2020-06-01T11:00:00Z'
    }
  ]

  const total_count = items.length

  issuesAndPullRequests.mockResolvedValue({
    data: {
      total_count,
      items
    }
  })

  return search({}).then(result => {
    expect(issuesAndPullRequests).toHaveBeenCalledTimes(1)
    expect(result).toEqual([
      {
        title: 'fooTitle',
        pr: 123,
        labels: 'fooLabels',
        state: 'fooState',
        repo: 'fooRepoUrl',
        url: 'fooHtmlUrl',
        assignee: null,
        assignees: 'fooAssignees',
        locked: false,
        daysOpened: 4
      }
    ])
  })
})

test('should return filtered issues if there is more than one page', () => {
  const firstCallItems = [
    {
      title: 'fooFirstTitle',
      number: 123,
      labels: 'fooLabels',
      state: 'fooState',
      repository_url: 'fooRepoUrl',
      html_url: 'fooHtmlUrl',
      assignee: null,
      assignees: 'fooAssignees',
      locked: false,
      created_at: '2020-06-01T11:00:00Z'
    },
    {
      title: 'barFirstTitle',
      number: 123,
      labels: 'barLabels',
      state: 'barState',
      repository_url: 'barRepoUrl',
      html_url: 'barHtmlUrl',
      assignee: 'barAssignee',
      assignees: 'barAssignees',
      locked: false,
      created_at: '2020-06-01T11:00:00Z'
    },
    {
      title: 'bazFirstTitle',
      number: 123,
      labels: 'bazLabels',
      state: 'bazState',
      repository_url: 'bazRepoUrl',
      html_url: 'bazHtmlUrl',
      assignee: null,
      assignees: 'bazAssignees',
      locked: true,
      created_at: '2020-06-01T11:00:00Z'
    }
  ]

  const secondCallItems = [
    {
      title: 'fooSecondTitle',
      number: 123,
      labels: 'fooLabels',
      state: 'fooState',
      repository_url: 'fooRepoUrl',
      html_url: 'fooHtmlUrl',
      assignee: null,
      assignees: 'fooAssignees',
      locked: false,
      created_at: '2020-06-01T11:00:00Z'
    },
    {
      title: 'barSecondTitle',
      number: 123,
      labels: 'barLabels',
      state: 'barState',
      repository_url: 'barRepoUrl',
      html_url: 'barHtmlUrl',
      assignee: 'barAssignee',
      assignees: 'barAssignees',
      locked: false,
      created_at: '2020-06-01T11:00:00Z'
    },
    {
      title: 'bazSecondTitle',
      number: 123,
      labels: 'bazLabels',
      state: 'bazState',
      repository_url: 'bazRepoUrl',
      html_url: 'bazHtmlUrl',
      assignee: null,
      assignees: 'bazAssignees',
      locked: true,
      created_at: '2020-06-01T11:00:00Z'
    }
  ]

  //set total_count more than default per_page = 30
  const total_count = 45;

  issuesAndPullRequests.mockResolvedValueOnce({
    data: {
      total_count,
      items: firstCallItems
    }
  }).mockResolvedValueOnce({
    data: {
      total_count,
      items: secondCallItems
    }
  })

  return search({}).then(result => {
    expect(issuesAndPullRequests).toHaveBeenCalledTimes(2)
    const searchParams = issuesAndPullRequests.mock.calls[1][0]
    expect(searchParams["page"]).toBeLessThanOrEqual(2)
    expect(result).toEqual([
      {
        title: 'fooSecondTitle',
        pr: 123,
        labels: 'fooLabels',
        state: 'fooState',
        repo: 'fooRepoUrl',
        url: 'fooHtmlUrl',
        assignee: null,
        assignees: 'fooAssignees',
        locked: false,
        daysOpened: 4
      }
    ])

  })
})

test('should return filtered issues if there are more than allowed pages', () => {
  const firstCallItems = [
    {
      title: 'fooFirstTitle',
      number: 123,
      labels: 'fooLabels',
      state: 'fooState',
      repository_url: 'fooRepoUrl',
      html_url: 'fooHtmlUrl',
      assignee: null,
      assignees: 'fooAssignees',
      locked: false,
      created_at: '2020-06-01T11:00:00Z'
    },
    {
      title: 'barFirstTitle',
      number: 123,
      labels: 'barLabels',
      state: 'barState',
      repository_url: 'barRepoUrl',
      html_url: 'barHtmlUrl',
      assignee: 'barAssignee',
      assignees: 'barAssignees',
      locked: false,
      created_at: '2020-06-01T11:00:00Z'
    },
    {
      title: 'bazFirstTitle',
      number: 123,
      labels: 'bazLabels',
      state: 'bazState',
      repository_url: 'bazRepoUrl',
      html_url: 'bazHtmlUrl',
      assignee: null,
      assignees: 'bazAssignees',
      locked: true,
      created_at: '2020-06-01T11:00:00Z'
    }
  ]

  const secondCallItems = [
    {
      title: 'fooSecondTitle',
      number: 123,
      labels: 'fooLabels',
      state: 'fooState',
      repository_url: 'fooRepoUrl',
      html_url: 'fooHtmlUrl',
      assignee: null,
      assignees: 'fooAssignees',
      locked: false,
      created_at: '2020-06-01T11:00:00Z'
    },
    {
      title: 'barSecondTitle',
      number: 123,
      labels: 'barLabels',
      state: 'barState',
      repository_url: 'barRepoUrl',
      html_url: 'barHtmlUrl',
      assignee: 'barAssignee',
      assignees: 'barAssignees',
      locked: false,
      created_at: '2020-06-01T11:00:00Z'
    },
    {
      title: 'bazSecondTitle',
      number: 123,
      labels: 'bazLabels',
      state: 'bazState',
      repository_url: 'bazRepoUrl',
      html_url: 'bazHtmlUrl',
      assignee: null,
      assignees: 'bazAssignees',
      locked: true,
      created_at: '2020-06-01T11:00:00Z'
    }
  ]

  //set total_count more than allowed_records = 1000
  const total_count = 57000;

  issuesAndPullRequests.mockResolvedValueOnce({
    data: {
      total_count,
      items: firstCallItems
    }
  }).mockResolvedValueOnce({
    data: {
      total_count,
      items: secondCallItems
    }
  })

  return search({}).then(result =>{
    expect(issuesAndPullRequests).toHaveBeenCalledTimes(2)
    const searchParams = issuesAndPullRequests.mock.calls[1][0]
    expect(searchParams["page"]).toBeLessThanOrEqual(34)
    expect(result).toEqual([
      {
        title: 'fooSecondTitle',
        pr: 123,
        labels: 'fooLabels',
        state: 'fooState',
        repo: 'fooRepoUrl',
        url: 'fooHtmlUrl',
        assignee: null,
        assignees: 'fooAssignees',
        locked: false,
        daysOpened: 4
      }
    ])
  })
})

test('should throw', async () => {
  const error = new Error('myError')
  issuesAndPullRequests.mockRejectedValue(error)
  await expect(search()).rejects.toEqual(error)
})
