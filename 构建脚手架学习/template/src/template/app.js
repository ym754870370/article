
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var bytedEnv = require('@byted-service/env');
var hdb = require('express-handlebars');
var app = express();

var pageOpt = { layout: false };

const env = bytedEnv.getIDC();

app.engine('html', hdb({
    extname: '.html',
    helpers: {
        BYTED_TCE_IDC: env,
    },
}));
app.set('views', path.join(__dirname, '/output/views'));
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/output/')));


app.use('/audit_cli_template_test/audit/', function (req, res, next) {
    const file = 'audit.html';
    res.render(file, pageOpt);
});

app.use('/audit_cli_template_test/app/', function(req, res, next) {
    const file = 'app.html';
    res.render(file, pageOpt);
});

app.use('/audit_cli_template_test/crm/', function(req, res, next) {
    const file = 'crm.html';
    res.render(file, pageOpt);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    // console.log('error', err);
    res.render('audit.html', pageOpt); // default html
});

module.exports = app;
