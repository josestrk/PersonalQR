var db = require('../util/mongodb').db;
var toObjectID = require('../util/mongodb').toObjectID;
var col = db.bind('topics');

function createTopic(topic, callback) {
	this.insert(topic, callback);
}

function getTopic(topicId, callback) {
	this.findById(topicId, callback);
}

function getTopicsAll(callback) {
	this.find({}, function(err, cursor) {
		if (err) {
			return callback(err);
		}
		cursor.toArray(callback);
	});
}

function delTopics(callback) {
	this.remove({}, callback);
}

function delTopic(topicId, callback) {
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
	createTopic: createTopic,
	getTopic: getTopic,
	getTopicsAll: getTopicsAll,
	delTopics: delTopics,
	delTopic: delTopic,
	setTopic: setTopic
});

module.exports = col;