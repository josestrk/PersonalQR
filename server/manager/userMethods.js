var daoUser = require('../dao/user');

//importas del objeto export{} de user.js el metodo de creacion de usuarios, y sus metodos asociados
function create(callback) {
    var temporaluser = {
        username:  "",
        name:  "",
        mail: "",
        password: "",
        bdate: "",
        followers: 0,
        following: 0
    }
    daoUser.create(temporaluser, callback);
}

function get(Iduser, callback) {
    daoUser.getById(Iduser, callback);
}

function getAll(callback) {
    daoUser.getAll(callback);
}

function setUser(Iduser, data, callback){
    daoUser.setUser(Iduser, data, callback);
}

function del(Iduser, callback) {
    daoUser.delUser(Iduser, callback);
}

module.exports = {
	createUser: create,
	getUser: get,
	getAllUser: getAll,
	setUser: setUser,
        delUser: del
};