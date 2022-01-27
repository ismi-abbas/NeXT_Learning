const http = require('http');

const server = http.createServer((req, res) => {
	//check the URL of the current request
	if (req.url == '/') {
		// set response header
		res.writeHead(200, { 'Content-Type': 'text/html' });

		// set response content
		res.write(
			'<html><body><p>This is home Page. Add something.</p></body></html>'
		);
		res.end();
	} else if (req.url == '/login') {
		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.write('<html><body><p>This is login Page.</p></body></html>');
	} else if (req.url == '/student') {
		res.writeHead(200, { 'Content-Type': 'text/html' });

		res.write('<html><body><p>This is student Page.</p></body></html>');

		res.end();
	} else if (req.url == '/admin') {
		res.writeHead(200, { 'Content-Type': 'text/html' });

		res.write(
			'<html><body><p>This is admin Page. I added something in here. And I added more in text here after running PM2</p></body></html>'
		);

		res.end();
	} else res.end('Invalid Request!');
});

const port = 3000;

server.listen(port);
console.log(`Server is running on port ${port}`);

// Unit testing - testing the individual functions
// Dev - environment for development - laptop/server/vdi/mwork - must do unit testing
// Prod - environment for production
// SIT - System Integration Testing
// UAT - User Acceptance Testing
// TSD - technical specification document
// FSD - functional specification document
