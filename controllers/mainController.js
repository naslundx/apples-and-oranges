var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Connect to database
mongoose.connect('');

// List randomizer (Fisher-Yates (aka Knuth) Shuffle algorithm)
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// Schema for sets
var SetModel = mongoose.model('sets', new mongoose.Schema({
    size: Number,
    id: Number,
    title: String,
    items: [String]
}));

// Schema for results
var ResultModel = mongoose.model('results', new mongoose.Schema({
    firstId: Number,
    secondId: Number,
    firstIndices: [String],
    secondIndices: [String]
}));

// URL parser
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app) {

app.get('/', function(req, res) {
    // Random set size
    var size = 2 + Math.floor(Math.random() * 4);

    // Fetch all of certain size
    SetModel.find({'size': size}, function (err, data) {
        if (err) {
            throw err;
        }
        var first = Math.floor(Math.random() * data.length);
        var second = (first + 1 + Math.floor(Math.random() * (data.length - 1))) % data.length;
        data[first].items = shuffle(data[first].items);
        data[second].items = shuffle(data[second].items);

        res.render('main', {firstId: data[first].id, secondId: data[second].id, first: data[first], second: data[second]});
    });
});

app.post('/', urlencodedParser, function(req, res) {
    // Get the data client has sent and store as result
    var newResultModel = ResultModel(req.body).save(function (err, data) {
        if (err) {
            throw err;
        }

        var item = ResultModel({
            firstId: req.body['firstId'],
            secondId: req.body['secondId'],
            firstIndices: req.body['firstIndices[]'],
            secondIndices: req.body['secondIndices[]']
        }).save(function(err) {
            if (err) {
                throw err;
            }                
        });

        res.redirect('thanks'); // TODO return some data about this set, or generally
    });
});

};
