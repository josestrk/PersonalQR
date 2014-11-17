var daoUser = require('../dao/user');

var User = require('./user').User;
//importas del objeto export{} de user.js el metodo de creacion de usuarios, y sus metodos asociados
function create(callback) {
    var temporaluser = new User(String(numUsers));
    daoUser.create(temporaluser, callback);
}

function get(Iduser, callback) {
    daoUser.getById(Iduser, callback);
}

function del(Iduser, callback) {
    daoUser.delUser(Iduser, callback);
}

function getAll(callback) {
    daoUser.getAll(callback);
}

function setUser(Iduser, data, callback){
    daoUser.setUser(Iduser, data, callback);
}

module.exports = {
	createuser: create,
	getuser: get,
	deluser: del,
	getAlluser: getAll,
	setUser: setUser
};