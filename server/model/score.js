function Score(idScore) {
  var _score = {
		_id: idScore,
    home: 0,
    guest: 0
  };

  this.scoreOneBasket = function(team, points) {

    if (checkValidBasket(points) && checkTeamName(team)) {
      _score[team] += points;
    }

		return this;
  };

  this.setScoreTeam = function(team, points) {
    if (checkValidScore(points) && checkTeamName(team)) {
      _score[team] = points;
    }

		return this;
  };

  this.getTeamPoints = function(team) {
    return _score[team];
  };

	this.toJSON = function() {
		return _score;
	};

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
  Score: Score
};
