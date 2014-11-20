var daoUser = require('../dao/dao_user');

function createUser(callback) {
  var temporalUser = {
    title : "",
    content : "",
    tags : "",
    topics : "",
    likes: "",
    comments: new Array(),
    date : ""
  };
  daoUser.createUser(temporalUser, callback);
}

function getUser(userId, callback) {
  daoUser.getUser(userId, callback);
}

function delUser(userId, callback) {
  daoUser.delUser(userId, callback);
}

function getUsers(callback) {
  daoUser.getUsers(callback);
}

function setUser(userId, data, callback){
  daoUser.setUser(userId, data, callback);
}

module.exports = {
	createUser: createUser,
	getUser: getUser,
	getUsers: getUsers,
	delUser: delUser,
	setUser: setUser
};
