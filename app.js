var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('express-handlebars');
var session=require('express-session');
var bodyParser = require('body-parser');  

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.engine('hbs', hbs({
	extname: 'hbs',
	defaultView: 'default',
	layoutsDir:__dirname + '/views/layouts/',
	partialsDir:__dirname  + '/views/partials/'
	
}));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// // Login Work Start
// app.use(session({secret:'secret-code',cookie:{maxAge:6000}}));
// var checkUser=function(req,res,next){
//   if(req.session.loggedIn){
//     next();
//   }else{
//     var admin="admin", password="admin";
//     if(req.body.username===admin && req.body.password===password){
//       req.session.loggedIn=true;
//       res.redirect('/');
//     }else{
//       res.render('login',{title:"Login Here"});
//     }
//   }
// };
// var logout=function(req,res,next){
//   req.session.loggedIn=false;
//   res.redirect('/');
// };
// app.use('/',checkUser, index);
// //  Login Work Start End

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);

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
