var daoTopic = require('../dao/topic');

//importas del objeto export{} de topic.js el metodo de creacion de usuarios, y sus metodos asociados
function create(callback) {
    var temporalTopic = {
        name:  ""
    };
    daoTopic.create(temporalTopic, callback);
}

function get(topicId, callback) {
    daoTopic.getById(topicId, callback);
}

function getAll(callback) {
    daoTopic.getAll(callback);
}

function setTopic(topicId, data, callback){
    daoTopic.setTopic(topicId, data, callback);
}

function del(topicId, callback) {
    daoTopic.delTopic(topicId, callback);
}

module.exports = {
	createTopic: create,
	getTopic: get,
	getAllTopics: getAll,
	setTopic: setTopic,
  delTopic: del
};

