module.exports = function(app) {

app.get('/thanks', function(req, res) {

    res.render('thanks');
    
});

}