var daoUser = require('../dao/dao_user');

function createUser(data, callback) {
	data["followers"]=0;
	data["following"]=0;
	daoUser.createUser(data, callback);
}

function getUser(userId, callback) {
	daoUser.getUser(userId, callback);
}

function delUser(userId, callback) {
	daoUser.delUser(userId, callback);
}

function getUsersAll(callback) {
	daoUser.getUsersAll(callback);
}

function setUser(userId, data, callback) {//in case any error with data, then nothing putted in db
	for (var setted in data) {
		for (var key in data[setted]) {
			console.log(key + '->' + data[setted][key]);//username->alevale
			switch (key) {
				case 'username':
					var res = data[setted][key].match(/[\w*\s+]*/)[0];
					if (data[setted][key] !== res) {
						return callback("Error, bad "+key , null);
					}
					break;
				case 'name':
					var res = data[setted][key].match(/[\w*\s+]*/)[0];
					if (data[setted][key] !== res) {
						return callback("Error, bad "+key , null);
					}
					break;
				case 'email':
					var res = data[setted][key].match(/[\w*\s+]*/)[0];
					if (data[setted][key] !== res) {
						return callback("Error, bad "+key , null);
					}
					break;
				case 'password':
					var res = data[setted][key].match(/[\w*\s+]*/)[0];
					if (data[setted][key] !== res) {
						return callback("Error, bad "+key , null);
					}
					break;
				case 'bdate':
					var res = data[setted][key].match(/[\w*\s+]*/)[0];
					if (data[setted][key] !== res) {
						return callback("Error, bad "+key , null);
					}
					break;
			}
		}
	}
	daoUser.setUser(userId, data, callback);
}

function validateUserByName(username, password, callback) {
	if(username==='' || password ===''){
		return callback("There was no data provided:", []);
	}
	daoUser.validateUserByName(username, password, callback);
}

function validateUserByEmail(email, password, callback) {
	if(email==='' || password ===''){
		return callback("There was no data provided:", []);
	}
	daoUser.validateUserByEmail(mail, password, callback);
}

function verifyUsername(username, callback){
	if(username === ''){
		return callback("There was no data provided:", []);
	}
	daoUser.verifyUsername(username, callback);
}

function verifyEmail(email, callback){
	if(email === ''){
		return callback("There was no data provided:", []);
	}
	daoUser.verifyEmail(email, callback);
}

module.exports = {
	createUser: createUser,
	getUser: getUser,
	getUsersAll: getUsersAll,
	delUser: delUser,
	setUser: setUser,
	validateUserByName: validateUserByName,
	validateUserByEmail: validateUserByEmail,
	verifyUsername: verifyUsername,
	verifyEmail: verifyEmail
};
