var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var routes = require('./routes/index');

mongoose.Promise = global.Promise;
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.all('/*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});


app.use('/', routes);

app.use(function (req, res, next) {
    res.status(404).json({ status: "Page not found" }).end();
})
//mongoose.connect("mongodb://localhost:27017/YourDB", { useNewUrlParser: true });
mongoose.connect("mongodb://localhost:27017/nodeTest", { useNewUrlParser: true }, function () { /* dummy function */ })
    .then(() => {
        console.log("connected to nodeTest database");
    })
    .catch(err => { // mongoose connection error will be handled here
        console.error('App starting error:', err.stack);
        process.exit(1);
    });

app.listen(3000, function () {
    console.log("Server is running on 3000 port....!")
});
