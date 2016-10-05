/**
 * This code creates a simple Person class, which exsits within a Person Directory
 * array. This server serves up a few simple routes and returns the data in
 * JSON format.
 *
 * @author Jesse Bloomster
 * @date October 5, 2016
 */



var express = require('express');
var app = express();

// Home page 
app.get('/', function (req, res) {
	res.send('Home');
});

/* People page
 * Returns all persons in the Person Directory as JSON data.
 */
app.get('/people', function (req, res) {
	res.status(200);
	res.json(personDirectory);
});


/* Person id
 * Returns the full record for the given id of a person. Returns 
 * a 404 page if id does not exist.
 */
app.get('/person/:id', function (req, res) {
	var result = findId(req.params.id);
	if (result == -1)
		res.sendStatus(404);
	else {
		res.status(200);
		res.json(personDirectory[result]);
	}
});

/* Person id name
 * Returns the first and last name for a given id of a person.
 * Returns a 404 page if id does not exist.
 */
app.get('/person/:id/name', function (req, res) {
	var result = findId(req.params.id);
	if (result == -1)
		res.sendStatus(404);
	else {
		res.status(200);
		res.json(personDirectory[result].fname + ' ' + personDirectory[result].lname);
	}
});

/* Person id years
 * Returns the number of years a given id has worked with the organization.
 * Returns a 404 page if id does not exist.
 */
app.get('/person/:id/years', function (req, res) {
	var result = findId(req.params.id);
	if (result == -1)
		res.sendStatus(404);
	else {
		res.status(200);
		res.json(getSeniority(personDirectory[result].startDate));
	}
});

/* Class Person */
function Person (fname, lname, id, startDate) {
	this.fname = fname;
	this.lname = lname;
	this.id = id;
	this.startDate = startDate;
}

/* findId searches the personDirectory for a given id. If the id is 
 * found, return the index in the directory for that id. If the id 
 * is not found, return a -1 value.
 */
function findId (id) {
	for (var i = 0; i < personDirectory.length; i++) {
		if (personDirectory[i].id == id)
			return i;
	}
	return -1;
}

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

/* hard coded data */
var personDirectory = [];
personDirectory.push(new Person('James', 'Cook', 16821, '6/8/2015'));
personDirectory.push(new Person('Bethany', 'Shoemaker', 13972, '2/23/2013'));
personDirectory.push(new Person('Nicole', 'Delruse', 13214, '8/15/2012'));
personDirectory.push(new Person('Amanda', 'Dynamin', 39751, '6/3/2010'));
personDirectory.push(new Person('Ryan', 'Smith', 28887, '4/11/2011'));
personDirectory.push(new Person('Alfred', 'Shugal', 19973, '6/29/2011'));
personDirectory.push(new Person('Courtney', 'Highpin', 39123, '5/5/2014'));
personDirectory.push(new Person('Ruth', 'Middy', 11187, '9/4/2008'));
personDirectory.push(new Person('Daniel', 'Den', 26977, '11/20/2010'));


// port number
app.listen(3000, function () {
	console.log('App listening on port 3000!');
});
