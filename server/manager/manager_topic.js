var daoTopic = require('../dao/dao_topic');

function createTopic(callback) {
  var temporalTopic = {
    title : "",
    content : "",
    tags : "",
    topics : "",
    likes: "",
    comments: new Array(),
    date : ""
  };
  daoTopic.createTopic(temporalTopic, callback);
}

function getTopic(topicId, callback) {
  daoTopic.getTopic(topicId, callback);
}

function delTopic(topicId, callback) {
  daoTopic.delTopic(topicId, callback);
}

function getTopicsAll(callback) {
  daoTopic.getTopicsAll(callback);
}

function setTopic(topicId, data, callback){
  daoTopic.setTopic(topicId, data, callback);
}

module.exports = {
	createTopic: createTopic,
	getTopic: getTopic,
	getTopicsAll: getTopicsAll,
	delTopic: delTopic,
	setTopic: setTopic
};
