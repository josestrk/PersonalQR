var db = require('../util/mongodb').db;
var toObjectID = require('../util/mongodb').toObjectID;
var col = db.bind('score');

function create(score, callback) {
	this.insert(score, callback);
}

function getById(scoreId, callback) {
	this.findById(scoreId, callback);
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

function delScore(scoreId, callback) {
	this.removeById(scoreId, callback);
}

function updateScore(scoreId, update, callback) {
	var query = {
		_id: toObjectID(scoreId)
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
	delScore: delScore,
	updateScore: updateScore
});

module.exports = col;