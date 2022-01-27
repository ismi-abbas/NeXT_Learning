const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, prettyPrint } = format;

const myFormat = printf(({ level, message, timestamp }) => {
	return `${timestamp} [${level}] ${message}`;
});

const developmentLogger = () => {
	return createLogger({
		level: 'debug',
		format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), myFormat),
		transports: [
			new transports.Console(),
			new transports.File({ filename: './logger/devLog.log' }),
		],
		exceptionHandlers: [
			new transports.File({ filename: './logger/exceptions.log' }),
		],
	});
};

module.exports = developmentLogger;
