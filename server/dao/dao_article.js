var db = require('../util/mongodb').db;
var toObjectID = require('../util/mongodb').toObjectID;
var col = db.bind('articles');

function createArticle(article, callback) {
	this.insert(article, callback);
}

function getArticle(articleId, callback) {
	this.findById(articleId, callback);
}

function getArticles(callback) {
	this.find({}, function(err, cursor) {
		if (err) {
			return callback(err);
		}
		cursor.toArray(callback);
	});
}

function delArticles(callback) {
	this.remove({}, callback);
}

function delArticle(articleId, callback) {
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
	createArticle: createArticle,
	getArticle: getArticle,
	getArticles: getArticles,
	delArticles: delArticles,
	delArticle: delArticle,
	setArticle: setArticle
});

module.exports = col;