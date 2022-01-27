const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize } = format;

const myFormat = printf(({ level, message, timestamp }) => {
	return `${timestamp} [${level}] ${message}`;
});

const developmentLogger = () => {
	return createLogger({
		level: 'debug',
		format: combine(timestamp(), myFormat),
		transports: [
			new transports.Console(),
			new transports.File({ filename: './logger/devLog.log' }),
		],
	});
};

module.exports = developmentLogger;
