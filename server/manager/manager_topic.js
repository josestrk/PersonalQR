var daoTopic = require('../dao/dao_topic');

//importas del objeto export{} de topic.js el metodo de creacion de usuarios, y sus metodos asociados
function create(callback) {
  var temporalTopic = {
    title : "",
    content : "",
    tags : "",
    topics : "",
    likes: "",
    comments: new Array(),
    date : ""
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
  daoTopic.del(topicId, callback);
}

module.exports = {
  createTopic: create,
  getTopic: get,
  getAllTopics: getAll,
  setTopic: setTopic,
  delTopic: del
};

