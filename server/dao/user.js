var db = require('../util/mongodb').db;
var toObjectID = require('../util/mongodb').toObjectID;
var col = db.bind('users');

function create(user, callback) {
	this.insert(user, callback);
}

function getById(userId, callback) {
	this.findById(userId, callback);
}

function getAll(callback) {
	this.find({}, function(err, cursor) {
		if (err) {
			return callback(err);
		}
		cursor.toArray(callback);
	});
}

function delAll(callback) {
	this.remove({}, callback);
}

function del(userId, callback) {
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

col.bind({
	create: create,
	getById: getById,
	getAll: getAll,
	delAll: delAll,
	del: del,
	setUser: setUser
});

module.exports = col;
