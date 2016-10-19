/**
 *  This implements an application server for static files using Node/Express.
 *
 *  @author jabloomster
 *  @date October 19, 2016
 *
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
	res.send('Hello, lab 7!');
});

app.get("/fetch", function(req, res) {
	res.send({"content" : "Hello, " + req.query.name + "!"});
});
