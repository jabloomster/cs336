/**
 *  This implements an application server for static files using Node/Express.
 *
 *  @author jabloomster
 *  @date October 13, 2016
 *
 *  Lab Questions:
 *
 *  6.1.a. When simply using Chrome as a standard browser, I was only able to view the GET request,
 *         and then the all request, for all routes not defined. The browser can't handle any other
 *         request due to the fact that there is no actual data and data storage. Since the HTTP
 *         requests implemented are simply test protocols, the browser cannot handle them.
 *
 *         For the curl commands, successful:
 *           curl --head localhost:3000/request
 *           curl localhost:3000/request
 *           curl -X PUT -d '{"text":"test data"}' -H 'Content-Type: application/json'
 *           curl -X POST -d '{"text":"test data"}' -H 'Content-Type: application/json'
 *           curl -X DELETE -d '{"text":"test data"}' -H 'Content-Type: application/json'        
 *
 *  6.1.b. The most appropriate response code is a 404, Page Not Found code.
 *
 *  6.2.a. Forms support GET, POST requests.
 *
 *  6.2.b. The form data is passing the 3 pieces of data in key/value format. The 'name' attribute
 *         in the html file specfices the data to go into the POST request. Then, Express uses
 *         the body-parser to parse the data that was sent. It is found in req.body, since it is
 *         a part of the request made. Then the body-parses interprets the data in JSON form from
 *         the key/value format: {"key":"value"}.
 */

// set up express
const express = require('express')
const app = express();
const http_status = require('http-status-codes');
const bodyParser = require('body-parser')

// set up public folder for static files
app.use(express.static('public'));

// use bodyParser, to handle JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set up host and port
const HOST = 'localhost';
const PORT = 3000;

// make sure port is listening for web server
app.listen(PORT, HOST, function() {
    console.log('Listening on ' + HOST + ':' + PORT + '...');
});

// home page
app.get('/', function(req, res) {
	res.status(http_status.OK);
	res.send('Hello, lab 6!');
});

// GET method
app.get('/request', function(req, res) {
	res.status(http_status.OK);
	res.send('Hello, GET!');
});

// HEAD method
app.head('/request', function(req, res) {
	res.status(http_status.OK);
	res.send('Hello, HEAD!');
});

// POST method
app.post('/request', function(req, res) {
	res.status(http_status.ACCEPTED);
	res.send('POST request: ' + req.body.text);
});

// Responds to form posts from the forms/index.html example
app.post('/forms', function(req, res) {
    res.send('Hello, form POST!<br>Posted message: <code>'
	     + req.body.user_message + '</code>');
});

// PUT method
app.put('/request', function(req, res) {
	res.status(http_status.ACCEPTED);
	res.send('PUT request: ' + req.body.text);
});

// DELETE method
app.delete('/request', function(req, res) {
	res.status(http_status.ACCEPTED);
	res.send('DELETE request: ' + req.body.text);
});

// handles all routes not specified
app.all('/*', function(req, res) {
	res.status(http_status.FORBIDDEN);
	res.send('Forbidden');
});
