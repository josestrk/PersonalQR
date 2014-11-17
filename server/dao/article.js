var db = require('../util/mongodb').db;
var toObjectID = require('../util/mongodb').toObjectID;
var col = db.bind('articles');

function create(article, callback) {
	this.insert(article, callback);
}

function getById(articleId, callback) {
	this.findById(articleId, callback);
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

function del(articleId, callback) {
	this.removeById(articleId, callback);
}

function setArticle(articleId, update, callback) {
	var query = {
		_id: toObjectID(articleId)
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
	setArticle: setArticle
});

module.exports = col;