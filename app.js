var express = require('express'),
    app = express(),
    session = require('express-session'),
    flash = require('connect-flash'),
    session = require('express-session'),
    auth = require('./auth.js'),
    bodyParser = require('body-parser'),
    path = require('path');

app.use(express.static(path.join(__dirname, 'static')));

app.use(session({
    secret: 'some-secret',
    saveUninitialized: false,
    resave: true
}));

// For parsing post request's data/body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Tells app to use password session
app.use(auth.initialize());
app.use(auth.session());

app.use(flash());

app.get('/static/export.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/static/export.js'));
});

app.get('/static/css/materialize.min.css', function(req, res) {
    res.sendFile(path.join(__dirname + '/static/css/materialize.min.css'));
});

app.get('/static/css/icon.css', function(req, res) {
    res.sendFile(path.join(__dirname + '/static/css/icon.css'));
});

app.get('/static/js/materialize.min.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/static/js/materialize.min.js'));
});

app.get('/static/js/jquery-3.2.1.min.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/static/js/jquery-3.2.1.min.js'));
});

app.get('/static/js/angular.min.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/static/js/angular.min.js'));
});

app.get('/static/js/appController.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/static/js/appController.js'));
});

// Set up routes
app.get('/', function(req, res) {
    if (req.user) {
        res.sendfile('dashboard.html', req.user.email);
        // console.log(req.user.email);
    } else {
        res.sendfile('login.html');
    }
});

app.get('/login', function(req, res) {
    res.sendFile(__dirname + "/" + "login.html");
});

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

app.post('/login',
    auth.authenticate('login', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })

);

var server = app.listen(3000, function() {
    var port = server.address().port;

    console.log('Server running on :', port);
});