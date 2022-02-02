const fs = require('fs');
const logger = require('../../logger');

fs.readFile('user.json', (err, data) => {
	if (err) {
		logger.error(err);
	} else {
		let user = JSON.parse(data);
		console.log(user);
	}
	console.log('File reading successful');
});
