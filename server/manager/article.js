var daoArticle = require('../dao/article');

function create(callback) {
  var article = {
    id: "",
    author:  "",
    title:  "",
    content: "",
    tags: "",
    topics: "",
    date : ""
  };

  daoArticle.create(article, callback);
}

function getArticleById(id, callback) {
  daoArticle.getById(id, callback);
}

function getAllArticles(callback) {
  daoArticle.getAll(callback);
}

function delArticle(id, callback) {
  daoArticle.delArticle(id, callback);
}

function setArticle(id, autor, titulo, contenido, t, topicos, fecha){
  var update = {
    $set: {}
  };

  update.$set[author] = autor;
  update.$set[title] = titulo;
  update.$set[content] = contenido;
  update.$set[tags] = t;
  update.$set[topics] = topicos;
  update.$set[date] = fecha;

  if (checkArticleId(id)) {
    daoArticle.updateArticle(id, autor, titulo, contenido, t, topicos, fecha);
  } else {
    callback('Invalid article id ' + id + '.');
  }
}

function setArticleDate(date) {
  //no se como hacer la fecha

  var update = {
    $set: {}
  };

  update.$set[date] = fecha;

  daoArticle.updateArticle(autor, titulo, contenido, t, topicos, fecha);
}


function getUser(id, callback) {
  daoArticle.getUser(id, callback);
}

module.exports = {
  create: create,
  getArticleById: getArticleById,
  getAllArticles: getAllArticles,
  delArticle: delArticle,
  setArticle: setArticle,
  setArticleDate: setArticleDate,
  getUser: getUser
};