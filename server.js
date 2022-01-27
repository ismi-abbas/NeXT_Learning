const express = require('express');
const app = express();

app.get('/', (req, res) => {
	res.send('This is the sample response');
});

app.get('/Hello', (req, res) => {
	res.send('This is the get request. Hello World!');
});

app.post('/', (req, res) => {
	res.send('You can post to this endpoint');
});

const port = 3001;

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
