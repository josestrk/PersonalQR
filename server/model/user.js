//articulos(idart, titulo, idusuario, fecha, contenido, tags, topics)
//comentarios(idcom, idusuario, fecha, contenido, idart)
//siguiendo(idart, usuario)

//cuando se genere un nuveo comentario al articulo asociado,
//habra que consultar la tabla de siguiendo y generar un evento para las paersonas que esten en la tabla


/*
db.articles.find( { id_auto: /54/ } ).sort( {date : 1})
esto es similar a un Select * from articles where id_autor="54" order by "date"
http://docs.mongodb.org/manual/reference/sql-comparison/
*/

function Article(idArticle) {
  var _article = {
		_id: idArticle,
    id_autor:  "",
    tittle:  "",
    content: "",
    tags: "",
    topics: "",
    date : ""
  };

  this.setall= function(autor, titulo, contenido, t, topicos, fecha){
    _article.id_autor = autor;
    _article.tittle = titulo;
    _article.content = contenido;
    _article.tags = t;
    _article.topics = topicos;
    _article.date = fecha;
    return this;
  };

  this.setdate = function(data){
    //no se como hacer la fecha
    _article.date = data;
    return this;
  };

  this.setid_autor = function(data){
    _article.id_autor = data;
    return this;
  };

  this.settittle = function(data){
    _article.tittle = data;
    return this;
  };

  this.setcontent = function(data){
    //antes de guardar un valor verificar que sea valido
    _article.content = data;
    return this;
  };

  this.settags = function(data){
    //antes de guardar un valor verificar que sea valido
    _article.tags = data;
    return this;
  };

  this.settopics = function(data){
    //antes de guardar un valor verificar que sea valido
    _article.topics = data;
    return this;
  };

  this.getuser = function(idArticle) {
    return _article[idArticle];
  };

	this.toJSON = function() {
		return _article;
	};

}
//fin funcion creadora de articulos



//inicio funcion creadora de usuarios
function User(idUser) {
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
    _user.following = data;
    return this;
  };

  this.setfollowers = function(data){
    //antes de guardar un valor verificar que sea valido
    _user.followers = data;
    return this;
  };

  this.setusername = function(data){
    //antes de guardar un valor verificar que sea valido
    _user.username = data;
    return this;
  };

  this.setname = function(data){
    //antes de guardar un valor verificar que sea valido
    _user.name = data;
    return this;
  };

  this.setmail = function(data){
    //antes de guardar un valor verificar que sea valido
    _user.mail = data;
    return this;
  };

  this.setpassword = function(data){
    //antes de guardar un valor verificar que sea valido
    _user.password = data;
    return this;
  };

  this.setbdate = function(data){
    //antes de guardar un valor verificar que sea valido
    _user.bdate = data;
    return this;
  };

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
  User: User,
  Article : Article
};
