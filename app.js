var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
var messages = require('./messages.js');
var Message = messages.Message
var app = express();

app.set('view engine','pug');
app.set('views','./views');

app.use(express.static(path.join(__dirname,'css')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/',function(request,response){
  Message.findAll()
      .then(function(rows){
          response.render('bulletin.pug', {messages:rows});
          })
});

app.get('/bulletin',function(request,response){
  Message.findAll()
      .then(function(rows){
          response.render('bulletin.pug', {messages:rows});
          })
});

app.get('/post', function(request, response){
	Message.findAll()
	.then(function(row) {
    	response.render('post.pug');
  });
});

// Posting message to messages database
app.post('/bulletin', function(request,response){
	Message.sync()
	       .then(function(){
	       		Message.create({
		       		title: request.body.title,
		       		user: request.body.user,
	            	post: request.body.post
	       		});
	       		response.redirect('/bulletin')
	       })
})

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

app.listen(3004, function () {
  console.log('bulletin board listening on port 3004!');
});
