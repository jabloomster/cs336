/**
 * This implements an application server for static files using Node/Express.
 *
 * @author kvlinden
 * @version summer2016
 */

const express = require('express')
const app = express();

const PORT = 3000;

app.use(express.static('public'));

app.listen(PORT, function() {
    console.log('Listening on port ' + PORT + '...');
});
