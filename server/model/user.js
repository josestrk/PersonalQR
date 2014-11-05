function User(idScore) {
  var _user = {
		_id: idUser,
    username:  "",
    name:  "",
    mail: "",
    password: "",
    bdate: "",
    followers: 0,
    following: 0
  };

  this.setfollowing = function(data){
    //antes de guardar un valor verificar que sea valido
    _user[following] = data;
    return this
  };

  this.setfollowers = function(data){
    //antes de guardar un valor verificar que sea valido
    _user[followers] = data;
    return this
  };

  this.setusername = function(data){
    //antes de guardar un valor verificar que sea valido
    _user[username] = data;
    return this;
  };

  this.setname = function(data){
    //antes de guardar un valor verificar que sea valido
    _user[name] = data;
    return this;
  };

  this.setmail = function(data){
    //antes de guardar un valor verificar que sea valido
    _user[mail] = data;
    return this;
  };

  this.setpassword = function(data){
    //antes de guardar un valor verificar que sea valido
    _user[password] = data;
    return this;
  };

  this.setbdate = function(data){
    //antes de guardar un valor verificar que sea valido
    _user[bdate] = data;
    return this;
  };

  // this.scoreOneBasket = function(team, points) {
  //
  //   if (checkValidBasket(points) && checkTeamName(team)) {
  //     _user[team] += points;
  //   }
  //
	// 	return this;
  // };
  //
  //
  //
  // this.setScoreTeam = function(team, points) {
  //   if (checkValidScore(points) && checkTeamName(team)) {
  //     _user[team] = points;
  //   }
  //
	// 	return this;
  // };

  this.getuser = function(idUser) {
    return _user[idUser];
  };

	this.toJSON = function() {
		return _user;
	};

}

/*
Aqui deberiamos validar la introduccion de datos, esto es el servidor,
por temas de injecciones de codigo y demas

AQUI VAN FUNCIONES DE VALIDACIONES!


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
}*/


module.exports = {
  User: User
};
