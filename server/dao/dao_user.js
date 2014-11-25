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

function validateUser(mail, password, callback) {
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

function setUser(userId, update, callback) {
	var query = {
		_id: toObjectID(userId)
	};

	var sort = [
		['_id', 1]
	];

	col.findAndModify(query, sort, update, {new: true}, callback);
}

col.bind({
	createUser: createUser,
	getUser: getUser,
	getUsersAll: getUsersAll,
	delUsers: delUsers,
	delUser: delUser,
	setUser: setUser,
	validateUser: validateUser
});

module.exports = col;
