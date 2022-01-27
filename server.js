const express = require('express');
const logger = require('./logger');

const app = express();

app.get('/', (req, res) => {
	res.send('This is the sample response');
	logger.info('Main page api hitted!');
});

app.get('/Hello', (req, res) => {
	res.send('This is the get request. Hello World!');
	logger.info('Hello world api hitted!');
});

app.post('/', (req, res) => {
	res.send('You can post to this endpoint');
	logger.info('Post api hitted!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	logger.info(`Listening on port ${PORT}`);
});
