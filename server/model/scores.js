var Score = require('./score').Score;

var scores = {};
var numScores = 0;

module.exports = {
	create: function() {
		var score = new Score(String(numScores));
		scores[numScores] = score;
		numScores++;
		return score;
	},
	get: function(scoreId) {
		return scores[scoreId];
	},
	del: function delScore(scoreId) {
		delete scores[scoreId];
	},
	getAll: function() {
		return Object.keys(scores).map(function(idScore) {
			return scores[idScore].toJSON();
		});
	}
};
