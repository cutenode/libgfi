const goodFirstIssue = require('../');

// let's set up a custom set of projects to look for
const options = {
	projects: {
		node: {
			name: 'Node.js',
			q: 'org:nodejs is:issue is:open label:"good first issue"',
			description:
				"Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine."
		}
	}
};

let log = async () => {
	// let's call a passed JSON file of projects
	// `node` will be looked for in that object first,
	// then if it can't be found we will search GitHub for it
	let issues = await goodFirstIssue('node', options);

	if (issues) {
		// and let's do some super pretty logging using the info we get back
		console.log(
			'There are ' +
				issues.length +
				' open Good First Issues in the Node.js GitHub organization.'
		);
		issues.forEach(function(issue) {
			console.log(
				'    ' +
					issue.url
						.toString()
						.slice(19, issue.url.toString().indexOf('/issue')) +
					'#' +
					issue.pr +
					': ' +
					issue.title
			);
		});
	}
};

// and, of course, run our code
log();
