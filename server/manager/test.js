var daoScore = require('../dao/score');

function create(callback) {

	var score = {
		home: 0,
		guest: 0
	};

	daoScore.create(score, callback);

}

function getById(scoreId, callback) {
	daoScore.getById(scoreId, callback);
}

function getAll(callback) {
	daoScore.getAll(callback);
}

function delScore(scoreId, callback) {
	daoScore.delScore(scoreId, callback);
}

function setScoreTeam(scoreId, team, points, callback) {
	
	var update = {
		$set: {}
	};
	
	update.$set[team] = points;
	
	if (checkValidScore(points) && checkTeamName(team)) {
		daoScore.updateScore(scoreId, update, callback);
	} else {
		callback('Invalid points[' + points + '] or team[' + team + ']');
	}
}


function scoreBasket(scoreId, team, points, callback) {
	
	var update = {
		$inc: {}
	};
	
	update.$inc[team] = points;
	if (checkValidBasket(points) && checkTeamName(team)) {
		daoScore.updateScore(scoreId, update, callback);
	} else {
		callback('Invalid points[' + points + '] or team[' + team + ']');
	}
}

function checkValidBasket(points) {
	return points === 1 || points === 2 || points === 3;
}

function checkTeamName(team) {
	return team === 'home' || team === 'guest';
}

function checkValidScore(points) {
	return isInteger(points) && points >= 0;
}

function isInteger(x) {
	return (typeof x === 'number') && (x % 1 === 0);
}


module.exports = {
	create: create,
	getById: getById,
	getAll: getAll,
	delScore: delScore,
	setScoreTeam: setScoreTeam,
	scoreBasket: scoreBasket
};