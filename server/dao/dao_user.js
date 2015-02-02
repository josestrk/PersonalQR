var db = require('../util/mongodb').db;
var toObjectID = require('../util/mongodb').toObjectID;
var col = db.bind('users');

function createUser(user, callback) {
	this.insert(user, callback);
}

function getUser(userId, callback) {
	this.findById(userId, callback);
}

function getUsersAll(callback) {
	this.find({}, function(err, cursor) {
		if (err) {
			return callback(err);
		}
		cursor.toArray(callback);
	});
}

function delUsers(callback) {
	this.remove({}, callback);
}

function delUser(userId, callback) {
	this.removeById(userId, callback);
}

function setUser(userId, update, callback) {
	var query = {
		_id: toObjectID(userId)
	};

	var sort = [
		['_id', 1]
	];

	col.findAndModify(query, sort, update, {new: true}, callback);
}

function validateUserByName(username, password, callback) {
	var where={};
	where["username"]=username;
	where["password"]=password;

	this.find(where, function(err, cursor) {
		if (err) {
			return callback(err+':', []);
		}
		cursor.toArray(callback);
	});
}

function validateUserByEmail(mail, password, callback) {
	var where={};
	where["mail"]=mail;
	where["password"]=password;

	this.find(where, function(err, cursor) {
		if (err) {
			return callback(err+':', []);
		}
		cursor.toArray(callback);
	});
}

function verifyUsername(username, callback) {
	var where={};
	where["username"]=username;

	this.find(where, function(err, cursor) {
		if (err) {
			return callback(err+':', []);
		}
		cursor.toArray(callback);
	});
}

function verifyEmail(email, callback) {
	var where={};
	where["mail"]=email;

	this.find(where, function(err, cursor) {
		if (err) {
			return callback('err');
		}
		
		cursor.toArray(callback);
	});
}

col.bind({
	createUser: createUser,
	getUser: getUser,
	getUsersAll: getUsersAll,
	delUsers: delUsers,
	delUser: delUser,
	setUser: setUser,
	validateUserByName: validateUserByName,
	validateUserByEmail: validateUserByEmail,
	verifyUsername: verifyUsername,
	verifyEmail: verifyEmail
});

module.exports = col;
