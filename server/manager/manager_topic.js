var daoTopic = require('../dao/dao_topic');

function createTopic(temporalTopic, callback) {
  daoTopic.createTopic(temporalTopic, callback);
}

function getTopic(topicId, callback) {
  daoTopic.getTopic(topicId, callback);
}

function delTopic(topicId, callback) {
  daoTopic.delTopic(topicId, callback);
}

function getTopicsByLetter(letter, callback) {
  daoTopic.getTopicsByLetter(letter, callback);
}

function setTopic(topicId, data, callback){
  var res = data.name.match(/[\w*\s+]*/)[0];
  if(data.name!==res){
    return callback("Error", null);//asi se crea un error para el ajax
  }//gracias al return se interrumpe la ejecucion del codigo
  data.name = res;
  daoTopic.setTopic(topicId, data, callback);
}

module.exports = {
	createTopic: createTopic,
	getTopic: getTopic,
	getTopicsByLetter: getTopicsByLetter,
	delTopic: delTopic,
	setTopic: setTopic
};
