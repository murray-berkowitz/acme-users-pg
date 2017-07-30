var pg = require('pg');

var client = new pg.Client(process.env.DATABASE_URL);

client.connect(function(err){
	if(err){
		console.log(err.message);
	}
})

function query(sql,params,cb){
	client.query(sql,params,cb);
}

function sync(cb){
	var sql = require('./seed');
	client.query(sql.sql, function(err){
		if(err){
			return cb(err);
		}
		cb(null);
	})
}

function seed(cb){
	createUser({name: 'bobby valentino', is_manager: 'FALSE'}, function(err, id){
		if(err){
			return cb(err);
		}
		createUser({name: 'ricky bobby', is_manager: 'TRUE'}, function(err, id){
			if(err){
				return cb(err);
			}
			createUser({name: 'bobby bobby', is_manager: 'FALSE'}, function(err, id){
				if(err){
					return cb(err);
				}
				console.log(id);
				cb(null);
			});
		});
	});
}

function createUser(user, cb){
	query('INSERT INTO users (name,is_manager) VALUES ($1, $2) returning id', [user.name, user.is_manager], function(err, result){
		if(err){
			return cb(err);
		}
		cb(null, result.rows[0].id);
	})
}


function getUsers(cb){
	query('SELECT * FROM users', function(err, result){
		if(err){
			return cb(err);
		}
		cb(null, result.rows);
	});
}

function getManagers(cb){
	query('SELECT * FROM users WHERE is_manager=true', function(err,result){
		if(err){
			return cb(err)
		}
		cb(null, result.rows);
	})
}

function deleteUser(id, cb){
	query('DELETE FROM users WHERE id=$1', [id], function(err, result){
		if(err){
			cb(err);
		}
		cb(null);
	})
}


module.exports = {
	sync,
	seed,
	createUser,
	getUsers,
	getManagers,
	deleteUser
};