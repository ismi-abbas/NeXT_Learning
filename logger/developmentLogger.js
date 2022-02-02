const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize } = format;

const myFormat = printf(({ level, message, timestamp }) => {
	return `[${level}] ${timestamp}  ${message}`;
});

const developmentLogger = () => {
	return createLogger({
		level: 'debug',
		format: combine(
			colorize(),
			timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
			myFormat
		),
		transports: [
			new transports.Console(),
			// new transports.File({ filename: './logger/devLog.log' }),
		],
		exceptionHandlers: [
			new transports.Console(),
			new transports.File({ filename: '/exceptions.log' }),
		],
	});
};

module.exports = developmentLogger;
