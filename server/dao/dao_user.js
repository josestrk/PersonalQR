var db = require('../util/mongodb').db;
var toObjectID = require('../util/mongodb').toObjectID;
var col = db.bind('users');

function createUser(user, callback) {
	this.insert(user, callback);
}

function getUser(userId, callback) {
	this.findById(userId, callback);
}

function changedsocialmedia(id, campo, valor, callback) {
	var query = {
		_id: toObjectID(id)
	};

	var update={
		$set:{
		}
	};

	switch(campo){
		case "Facebook":
			var flag =true;
		break;
		case "Twitter":
			var flag =true;
		break;
		case "GitHub":
			var flag =true;
		break;
		case "Instagram":
			var flag =true;
		break;
		case "Google+":
			var flag =true;
		break;
		case "YouTube":
			var flag =true;
		break;
		case "Username":
			var flag =true;
		break;
		case "Name":
			var flag =true;
		break;
		case "Password":
			var flag =true;
		break;
		case "Bdate":
			var flag =true;
		break;
	}
	
	if(flag){
			update.$set[campo.toLowerCase()] = valor;

			var sort = [
				['_id', 1]
			];

			col.findAndModify(query, sort, update, {new: true}, callback);
	}
}

function getUsersAll(callback) {
	this.find({}, function(err, cursor) {
		if (err) {
			return callback(err);
		}
		cursor.toArray(callback);
	});
}

function followUser(ourUser, extUser, callback){
	var query = {
		_id: toObjectID(ourUser)
	};

	var update={
		$push:{
		}
	};

	update.$push["following"] = extUser;

	var sort = [
		['_id', 1]
	];

	col.findAndModify(query, sort, update, {new: true}, callback);
}

function unfollowUser(ourUser, extUser, callback){
	var query = {
		_id: toObjectID(ourUser)
	};

	var update={
		$pull:{
		}
	};

	update.$pull["following"] = extUser;

	var sort = [
		['_id', 1]
	];

	col.findAndModify(query, sort, update, {new: true}, callback);
}

function addfollower(extUser, ourUser, callback){
		var query = {
			_id: toObjectID(extUser)
		};

		var update={
			$push:{
			}
		};

		update.$push["followers"] = ourUser;

		var sort = [
			['_id', 1]
		];

		col.findAndModify(query, sort, update, {new: true}, callback);
}

function deletefollower(extUser, ourUser, callback){
		var query = {
			_id: toObjectID(extUser)
		};

		var update={
			$pull:{
			}
		};

		update.$pull["followers"] = ourUser;

		var sort = [
			['_id', 1]
		];

		col.findAndModify(query, sort, update, {new: true}, callback);
}


function delUserAll(callback) {
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
	where["email"]=mail;
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
	where["email"]=email;
	this.find(where, function(err, cursor) {
		if (err) {
			return callback(err+':', []);
		}
		cursor.toArray(callback);
	});
}

col.bind({
	createUser: createUser,
	getUser: getUser,
	getUsersAll: getUsersAll,
	delUserAll: delUserAll,
	delUser: delUser,
	setUser: setUser,
	validateUserByName: validateUserByName,
	validateUserByEmail: validateUserByEmail,
	verifyUsername: verifyUsername,
	verifyEmail: verifyEmail,
	followUser : followUser,
	unfollowUser : unfollowUser,
	addfollower : addfollower,
	deletefollower : deletefollower,
	changedsocialmedia : changedsocialmedia
});

module.exports = col;
