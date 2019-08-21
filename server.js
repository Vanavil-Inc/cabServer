var express = require('express');
const config = require('./database');
const routes = require('./routes');
const cors = require('cors')

const mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
    
//connection to database
mongoose.connect(config.db, { useNewUrlParser: true });

mongoose.connection.on('connected', () => {
console.log('connected to database:' + config.db);
});

mongoose.connection.on('error', (err) => {
console.log('Database error:' + err);
});

//Enabling cors
app.use(cors());

// Connect all our routes to our application
app.use('/', routes);

// Turn on that server!
app.listen(8082, () => {
console.log('App listening on port 8081');
});