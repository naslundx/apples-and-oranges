var express = require('express');
var mainController = require('./controllers/mainController')
var aboutController = require('./controllers/aboutController')
var thanksController = require('./controllers/thanksController')

var app = express();

// Set up template engine
app.set('view engine', 'ejs');

// Static files
app.use('/assets', express.static('./public'));

// Fire controllers
mainController(app);
aboutController(app);
thanksController(app);

// Listen to port
var port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log('App is running on http://localhost:' + port);
});
