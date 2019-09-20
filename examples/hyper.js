const gfi = require('..');

gfi('zeit/hyper') // libgfi this returns a promise
	.then(issue => {
		// so we can use .then() to handle the results
		if (issue) console.log(issue);
	})
	.catch(error => {
		// we want to be sure to catch if there are errors
		console.log(error);
	});
