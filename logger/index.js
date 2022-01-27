const testLogger = require('./testLogger');

let logger = null;

if (process.env.NODE_ENV !== 'production') {
	logger = testLogger();
}

module.exports = logger;
