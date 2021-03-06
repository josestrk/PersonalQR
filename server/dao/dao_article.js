var db = require('../util/mongodb').db;
var toObjectID = require('../util/mongodb').toObjectID;
var col = db.bind('articles');

function createArticle(article, callback) {
	this.insert(article, callback);
}

function delArticlesAll(callback) {
	this.remove({}, callback);
}

function editArticle(article, callback) {
		// var query = {
		// 	_id: toObjectID(article._id)
		// };
		//
		// var update={
		// 	$inc:{
		// 	}
		// };
		//
		// update.$pull["following"] = extUser;
		//
		// var sort = [
		// 	['_id', 1]
		// ];
		//
		// col.findAndModify(query, sort, update, {new: true}, callback);




	var that = this;
	//puesto que no me funciona el find, and modify lo fuerzo
	this.removeById(toObjectID(article['_id']), function(){
		article['_id']=undefined;
		that.insert(article, callback);
	});

	// col.findAndModify(query, sort, update, {new: true}, callback);

}

function getArticle(articleId, callback) {
	this.findById(articleId, callback);
}

function getArticlesAll(callback, skip) {
	this.find({}, function(err, cursor) {
		if (err) {
			return callback(err);
		}
		var numbers=3;
		cursor.sort({date: -1});
		cursor.limit(numbers);
		cursor.skip((skip*numbers) || 0);
		cursor.toArray(callback);
	});
}

function getmyarticles(skip, userId, callback) {
	var where={};
	where["iduser"]=userId;
	this.find(where, function(err, cursor) {
		if (err) {
			return callback(err);
		}
		var numbers=3;
		cursor.sort({date: -1});
		cursor.limit(numbers);
		cursor.skip((skip*numbers) || 0);
		cursor.toArray(callback);
	});
}

function getUserArticles(userId, callback) {
	var where={};
	where["iduser"]=userId;

	this.find(where, function(err, cursor) {
		if (err) {
			return callback(err);
		}
		cursor.toArray(callback);
	});
}

function searchbytopic(topic, callback) {
	var where={
		topic: {}
	};
	where.topic=topic;

	this.find(where, function(err, cursor) {
		if (err) {
			return callback(err);
		}
		cursor.limit(10);
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

function comment(articleId, comment, name, iduser, callback) {
	var query = {
		_id: toObjectID(articleId)
	};

	var update={
		$push:{
		}
	};

	update.$push["coments"] = {
		com : comment,
		user : name,
		_id : iduser
	};

	var sort = [
		['_id', 1]
	];

	col.findAndModify(query, sort, update, {new: true}, callback);
}

function like(articleId, iduser, callback) {
	var query = {
		_id: toObjectID(articleId)
	};

	var update={
		$addToSet:{
		},
		$pull:{
		}
	};

	update.$addToSet["likes"] = iduser;
	update.$pull["unlikes"] = iduser;

	var sort = [
		['_id', 1]
	];

	col.findAndModify(query, sort, update, {new: true}, callback);
}

function unlike(articleId, iduser, callback) {
	var query = {
		_id: toObjectID(articleId)
	};

	var update={
		$addToSet:{
		},
		$pull:{
		}
	};

	update.$addToSet["unlikes"] = iduser;
	update.$pull["likes"] = iduser;

	var sort = [
		['_id', 1]
	];

	col.findAndModify(query, sort, update, {new: true}, callback);
}



col.bind({
	createArticle: createArticle,
	getArticle: getArticle,
	getUserArticles: getUserArticles,
	getArticlesAll: getArticlesAll,
	delArticles: delArticles,
	delArticle: delArticle,
	setArticle: setArticle,
	editArticle: editArticle,
	searchbytopic : searchbytopic,
	comment : comment,
	delArticlesAll : delArticlesAll,
	getmyarticles : getmyarticles,
	like : like,
	unlike : unlike
});

module.exports = col;
