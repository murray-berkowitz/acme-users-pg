var express = require('express');
var router = require('express').Router();
var db = require('../db');
var path = require('path');

router.use('/',express.static('public'));

router.get('/', function(req,res,next){
	db.getUsers(function(err,users){
		if(err){
			return next(err);
		}
		res.render('users', {users, usr:true});
	})
});

router.post('/', function(req,res,next){
	if(req.body.name == ''){
		var error = 'Empty Form';
		res.render('error', error);
	}
	var is_manager = req.body.is_manager || false;
	db.createUser(req.body, function(err){
		if(err){
			return next(err);
		}
		res.redirect('/users');
	})
})

router.put('/:id', function(req,res,next){
	db.makeManager(req.params.id*1, function(err){
		if(err){
			return next(err);
		}
		res.redirect('/users');
	})
})

router.delete('/:id', function(req,res,next){
	db.deleteUser(req.params.id*1, function(err){
		if(err){
			return next(err);
		}
		res.redirect('/users');
	})
})

router.get('/managers', function(req,res,next){
	db.getManagers(function(err,managers){
		if(err){
			return next(err);
		}
		res.render('managers', {managers, mg:true});
	})
})

router.put('/managers/:id', function(req,res,next){
	db.removeAsManager(req.params.id*1, function(err){
		if(err){
			return next(err);
		}
		res.redirect('/users/managers');
	})
})


module.exports = router;