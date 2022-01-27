const developmentLogger = require('./developmentLogger');
const productionLogger = require('./productionLogger');

let logger = null;

if (process.env !== 'development') {
	logger = developmentLogger();
}

if (process.env !== 'production') {
	logger = productionLogger();
}

module.exports = logger;
