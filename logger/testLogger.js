// const winston = require('winston');
// Destructuring methods
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf, colorize } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
	return `${timestamp} [${level}] ${message}`;
});

const testLogger = () => {
	return createLogger({
		level: 'debug',
		format: combine(colorize(), timestamp({ format: 'HH:mm:ss' }), myFormat),
		transports: [new transports.Console()],
	});
};

module.exports = testLogger;
