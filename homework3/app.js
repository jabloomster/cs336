/**
 * This code creates a simple Person class, which exsits within a Person Directory
 * array. This server serves up a few simple routes and returns the data in
 * JSON format.
 *
 * @author Jesse Bloomster
 * @date October 28, 2016
 */

var express = require('express');
var path = require('path');
var app = express();

const http_status = require('http-status-codes');
const bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient

app.set('port', (process.env.PORT || 3000));

// Connect to MongoDB
var db;
var PASSWORD = '******';
var mongoURL = 'mongodb://cs336:' + PASSWORD + '@ds139937.mlab.com:39937/cs336';
MongoClient.connect(mongoURL, function(err, dbConnection) {
	if (err) throw err;
	db = dbConnection;
});

// use bodyParser, to handle JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set up public folder for static files
app.use('/', express.static(path.join(__dirname, 'dist')));

/* People page
 * Returns all persons in the Person Directory as JSON data.
 */
app.get('/api/people', function (req, res) {
	res.status(200);
    db.collection('persons').find({}).toArray(function(err, docs) {
		if (err) throw err;
		res.json(docs);
	});
});


/* Person id
 * Returns the full record for the given id of a person. Returns 
 * a 404 page if id does not exist.
 */
app.get('/person/:id', function (req, res) {
	db.collection('persons').find( { id: parseInt(req.params.id) }, { _id: 0 } ).toArray(function(err, docs) {
		if (err) throw err;
		if (docs.length == 0) {
			res.send("ID not found");
		}
		else res.json(docs);
	});
});

/* Put Person id
 * Updates the full record for the given id of a person. Returns
 * a 404 page if id does not exist.
 */
app.put('/person/:id', function(req, res) {
	db.collection('persons').update(
		{ id: parseInt(req.params.id) },
		{
			$set: {
				id: req.params.id,
				fname: req.body.fname,
				lname: req.body.lname,
				start: req.body.startDate
			}
		},
		{ upsert: true }
	)
	res.send("Updated.");
	
});

/* Delete Person id
 * Deletes the full record for the given id of a person. Returns
 * a 404 page if id does not exist.
 */
app.delete('/person/:id', function(req, res) {
	db.collection('persons').deleteOne( { id: parseInt(req.params.id) } )
	res.send("Deleted.");
});

/* Person id name
 * Returns the first and last name for a given id of a person.
 * Returns a 404 page if id does not exist.
 */
app.get('/person/:id/name', function (req, res) {
	db.collection('persons').find( { id: parseInt(req.params.id) }, { _id: 0, fname: 1, lname: 1 } ).toArray(function(err, docs) {
		if (err) throw err;
		if (docs.length == 0) {
			res.send("ID not found");
		}
		else res.send(docs[0]['fname'] + ' ' + docs[0]['lname']);
	});
});

/* Person id years
 * Returns the number of years a given id has worked with the organization.
 * Returns a 404 page if id does not exist.
 */
app.get('/person/:id/years', function (req, res) {
	db.collection('persons').find( { id: parseInt(req.params.id) }, { _id: 0, start: 1 } ).toArray(function(err, docs) {
		if (err) throw err;
		if (docs.length == 0) {
			res.send("ID not found");
		}
		else res.send(getSeniority(docs[0]['start']) + ' year(s)');
	});	
});

/* Post forms
 * Creates a new user in the system from a given form.
 */
app.post('/api/people', function(req, res) {
	var data = req.body;
	var newPerson = {
		id: Math.floor(Math.random()*9000000) + 1000000,
		fname: data.fname,
		lname: data.lname,
		start: data.start
	};
	db.collection('persons').insertOne(newPerson, function(err, result) {
		if (err) throw err;
		db.collection('persons').find({}).toArray(function(err, docs) {
			if (err) throw err;
			res.json(docs);
		});
	});
});

/* Post data
 * Returns information based on given id number in form
 */
app.post('/getData', function(req, res) {
	db.collection('persons').find( { id: parseInt(req.body.id) } ).toArray(function(err, docs) {
		if (err) throw err;
		if (docs.length == 0) {
			res.send("ID not found");
		}
		else res.send([{"name": docs[0]['fname'] + ' ' + docs[0]['lname'],
				        "id": docs[0]['id'],
				        "yearsWorked" : getSeniority(docs[0]['start'])}]);
	});
});
	
/* getSeniority returns the number of whole years rounded down from
 * a given date to the current date.
 * http://jsfiddle.net/codeandcloud/n33RJ/
 */
function getSeniority(dateString) {
    var today = new Date();
    var startDate = new Date(dateString);
    var years = today.getFullYear() - startDate.getFullYear();
    var m = today.getMonth() - startDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < startDate.getDate())) {
        years--;
    }
    return years;
}

app.listen(app.get('port'), function() {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
});
