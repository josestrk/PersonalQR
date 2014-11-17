function Article(idArticle) {
  var _article = {
		_id: idArticle,
    id_autor:  "",
    title:  "",
    content: "",
    tags: "",
    topics: "",
    date : ""
  };

  this.setall= function(autor, titulo, contenido, t, topicos, fecha){
    _article.id_autor = autor;
    _article.title = titulo;
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

  this.settitle = function(data){
    _article.title = data;
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

module.exports = {
  Article : Article
};