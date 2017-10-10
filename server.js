var express = require('express');
var app = express();

app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.set('views', './views');

var port = process.env.PORT || 3000;
var server = require("http").Server(app);

app.get('/', function(req, res) {
    res.render("index");
});

server.listen(port, function() {
    console.log('Magic happens on port ' + port);
});