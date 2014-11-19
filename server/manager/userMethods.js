var daoUser = require('../dao/user');

//importas del objeto export{} de user.js el metodo de creacion de usuarios, y sus metodos asociados
function create(callback) {
  var temporalUser = {
    username:  "",
    name:  "",
    mail: "",
    password: "",
    bdate: "",
    followers: 0,
    following: 0
  };
  daoUser.create(temporalUser, callback);
}

function get(userId, callback) {
  daoUser.getById(userId, callback);
}

function getAll(callback) {
  daoUser.getAll(callback);
}

function setUser(userId, data, callback){
  daoUser.setUser(userId, data, callback);
}

function del(userId, callback) {
  daoUser.delUser(userId, callback);
}

module.exports = {
	createUser: create,
	getUser: get,
	getAllUsers: getAll,
	setUser: setUser,
  delUser: del
};