var db = require('../util/mongodb').db;
var toObjectID = require('../util/mongodb').toObjectID;
var col = db.bind('topics');

function create(topic, callback) {
	this.insert(topic, callback);
}

function getById(topicId, callback) {
	this.findById(topicId, callback);
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

function del(topicId, callback) {
	this.removeById(topicId, callback);
}

function setTopic(topicId, update, callback) {
	var query = {
		_id: toObjectID(topicId)
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
	setTopic: setTopic
});

module.exports = col;
