var express = require('express');
var nunjucks = require('nunjucks');
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({extended:false});
var app = express();
var db = require('./db');
var routes = require('./routes/users');
var path = require('path');

app.use(express.static('public'));


app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', {noCache:true});

app.use(urlEncodedParser);
app.use(require('method-override')('_method'));
app.use('/users',routes);

app.use(function(err,req,res,next){
	res.render('error', {err});
})

app.get('/', function(req,res,next){
	res.redirect('/users');
})

var server = app.listen(port, function(){
	console.log(`Listening on port ${port}`);
	db.sync(function(err){
		if(err){
			return console.log(err.message);
		}
		db.seed(function(err){
			if(err){
				return console.log(err.message);
			}
			db.getUsers(function(err, users){
				if(err){
					return console.log(err.message);
				}
				console.log(users);
			})
		})
	})
});
