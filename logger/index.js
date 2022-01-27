const testLogger = require('./testLogger');
const productionLogger = require('./productionLogger');

let logger = null;

if (process.env.NODE_ENV !== 'test') {
	logger = testLogger();
} else if (process.env.NODE_ENV !== 'production') {
	logger = productionLogger();
}

module.exports = logger;
