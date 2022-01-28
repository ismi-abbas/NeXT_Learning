const express = require('express');
const mysql = require('mysql');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('./logger');

const app = express();
app.use(express.json({ extended: false }));

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'next_learning',
});

// Routes
app.use('/login', require('./routes/api/login'));
app.use('/getRandomJson', require('./routes/api/getRandomJson'));

app.get('/', (req, res) => {
	res.send('This is the sample response');
	logger.info('Main page api hitted!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	logger.info(`Listening on port ${PORT}`);
});
