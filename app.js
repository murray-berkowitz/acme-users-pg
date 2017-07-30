var express = require('express');
var nunjucks = require('nunjucks');
var port = process.env.PORT || 3000;
var app = express();
var db = require('./db');

app.set('view engine', 'html')
app.engine('html', nunjucks.render);
nunjucks.configure('views', {noCache:true});
app.use(require('method-override')('_method'));

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
