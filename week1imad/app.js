var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var image = require('./routes/htm');
var data1=require('./routes/data1.json');
var data2=require('./routes/data2.json');

var input=require('./routes/input');
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/html',image);

app.use("/input",input);
app.get('/getcookie',function (req,res) {
   var cookie=req.cookies.mycookie;
    console.log("cookie info is")
    console.log(cookie);
    res.end();
});
app.get("/robots.txt",function (req,res) {
    res.writeHead(200);
    res.write("you should not be here");
    res.write("\nrequested resource not found");
    res.end();
});
app.get('/authors',function (req,res) {
var i;
    res.writeHead(200);
for(i=0;i<data1.length;i++)
{
    var count=0;
    for(var j=0;j<data2.length;j++)
    {
        if(data1[i].id === data2[j].userId)
            count++;
        // console.log("hi");
    }
   // console.log(data1[i].name+" has published " + count + " posts");
    res.write(data1[i].name+" has published " + count + " posts\n");

}
    res.end();
});
app.post("/some.txt",function (req,res) {
    console.log("text entered is:");
    console.log(req.body.otext);

    res.end();
});

app.get('/setcookie',function (req,res,next) {

    var cookie = req.cookies.mycookie;
     //cookie=undefined;
    if (cookie === undefined) {


        res.cookie('mycookie', {firstname: "saitej", age: 19},{maxAge:900000});
        console.log('cookie created successfully');

        }
        else
        console.log(cookie);
    next();
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
  res.render('error');
});

module.exports = app;
