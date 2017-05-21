var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Connect to database
mongoose.connect('');

// Schema for sets
var SetModel = mongoose.model('sets', new mongoose.Schema({
    size: Number,
    title: String,
    items: [String]
}));

// Schema for results
var ResultModel = mongoose.model('results', new mongoose.Schema({
    first: Number,
    second: Number,
    value: String
}));

// URL parser
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app) {

app.get('/main', function(req, res) {
    // Random set size
    var size = 3; // Math.floor(Math.random() * (7 - 2 + 1)) + 2;
    console.log('Fetching size = ' + size);

    // Fetch all of certain size
    SetModel.find({'size': size}, function (err, data) {
        if (err) {
            throw err;
        }
        var first = 0; //Math.floor(Math.random() * (data.length + 1));
        var second = 1; // Math.floor(Math.random() * (data.length + 1)); // TODO make sure first != second
        
        console.log(first + ':' + data[first]);
        console.log(second + ':' + data[second]);

        res.render('main', {first: data[first], second: data[second]});
    });
});

app.post('/main', urlencodedParser, function(req, res) {
    // Get the data client has sent and store as result
    // TODO do some validation on req.body??
    console.log(req.body);
    var newResultModel = ResultModel(req.body).save(function (err, data) {
        if (err) {
            throw err;
        }

        res.redirect('thanks')
        // TODO return some data about this set, or generally
        // TODO render thank you page with option to load new
    });
});

// TODO can be removed?
/*
app.delete('/main/:item', function(req, res) {
    
    // Delete requested item from mongodb
    
    SetModel.find({item: req.params.item.replace(/\-/g, ' ')}).remove(function (err, data) {
        if (err) {
            throw err;
        }
        res.json(data); 
    });
});
*/

};
