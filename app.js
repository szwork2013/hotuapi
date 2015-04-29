'use strict';
var config = require('./config/config');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// uncomment after placing your favicon in /static
//app.use(favicon(__dirname + '/static/favicon.ico'));

// db
var mongoose = require('mongoose');
mongoose.connect('mongodb://' + config.get("DB_HOST") + '/' + config.get("DB_NAME"));

// session store
var session    = require('express-session');
var MongoStore = require('connect-mongo')(session);
console.log({
        db: config.get("DB_NAME"),
        host: config.get("DB_HOST"),
        port: config.get("DB_PORT")
    });
app.use(session({
    secret: config.get("COOKIE_SECRET"),
    store: new MongoStore({
        db: config.get("DB_NAME"),
        host: config.get("DB_HOST"),
        port: config.get("DB_PORT")
    }),
    cookie: {maxAge: config.get("COOKIE_MAX_AGE") },
    resave: false,
    saveUninitialized :false
}));
 console.log(22333);
//CORS middleware
if (app.get('env') === 'development') {
    var allowCrossDomain = function(req, res, next) {

        res.header('Access-Control-Allow-Origin', config.get('XS_DOMAIN'));

        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.header('Access-Control-Allow-Credentials', 'true');

        next();
    }
    app.use(allowCrossDomain);
}

/***********************************/
app.use('/api/weixin', require('./apps/weixin'));

app.use('/api/hotu', require('./apps/hotu'));

app.use('/api/stat', require('./apps/stat'));

/***********************************/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
});

module.exports = app;

// start app
if (require.main === module) {
    var debug = require('debug')('app');
    var port = config.get("PORT");
    var host = config.get("HOST");
    var server = app.listen(port, host, function() {
      debug('Express server listenindg on port ' + server.address().port);
    });
}
