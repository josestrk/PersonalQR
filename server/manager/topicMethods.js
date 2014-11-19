var daoUser = require('../dao/topic');

//importas del objeto export{} de topic.js el metodo de creacion de usuarios, y sus metodos asociados
function create(callback) {
    var temporalTopic = {
        name:  ""
    };
    daoUser.create(temporalUser, callback);
}

function get(topicId, callback) {
    daoUser.getById(topicId, callback);
}

function getAll(callback) {
    daoUser.getAll(callback);
}

function setTopic(topicId, data, callback){
    daoUser.setTopic(topicId, data, callback);
}

function del(topicId, callback) {
    daoUser.delUser(topicId, callback);
}

module.exports = {
	createTopic: create,
	getTopic: get,
	getAllTopics: getAll,
	setTopic: setTopic,
        delTopic: del
};

