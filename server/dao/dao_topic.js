var db = require('../util/mongodb').db;
var toObjectID = require('../util/mongodb').toObjectID;
var col = db.bind('topics');

function createTopic(topic, callback) {
	if (typeof(topic) == 'object') {
		this.insert(topic, callback);
	}else{
		var aux = {
			name: topic
		}
		this.insert(aux, callback);
	}
}

function getTopic(topic, callback) {
	this.find({name :topic}, function(err, cursor) {
		if (err) {
			return callback(err);
		}
		cursor.toArray(callback);
	});
}

function getTopicsByLetter(letter, callback) {
	this.find({ name: new RegExp('^' + letter) }, function(err, cursor) {
		if (err) {
			return callback(err);
		}
		cursor.toArray(callback);
	});
}

function delallTopic(callback) {
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
	getTopicsByLetter: getTopicsByLetter,
	delTopic: delTopic,
	setTopic: setTopic,
	delallTopic : delallTopic
});

module.exports = col;
