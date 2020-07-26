var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cors = require('cors')
var attachmentsRouter = require('./routes/attachment');

var app = express();
app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ limit: "200mb", extended: true, parameterLimit: 1000000 }));
app.use(bodyParser.json({ limit: "200mb" }));

mongoose.connect('mongodb://localhost:27017/vysion', { useNewUrlParser: true, useUnifiedTopology: true });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(__dirname + '/uploads'));
// app.use(express.static('public'));
app.listen(() => {
    console.log("Server listening on port 3000");
});

app.use('/attachment', attachmentsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;