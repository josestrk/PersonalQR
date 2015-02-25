var db = require('../util/mongodb').db;
var toObjectID = require('../util/mongodb').toObjectID;
var col = db.bind('connected');

function addConnected(id, callback) {
  var query = {
    _id: toObjectID("allids")
  };

  var update={
    $addToSet:{
    }
  };

  update.$addToSet["ids"] = id;

  var sort = [
    ['_id', 1]
  ];

  col.findAndModify(query, sort, update, {new: true}, callback);
}

function delConnected(id, callback) {
  var query = {
    _id: toObjectID("allids"),
  };

  var update={
    $pull:{
    }
  };

  update.$pull["ids"] = id;

  var sort = [
    ['_id', 1]
  ];

  col.findAndModify(query, sort, update, {new: true}, callback);
}

function getConnectedPpl(callback) {
  this.find({}, function(err, cursor) {
    if (err) {
      return callback(err);
    }
    cursor.toArray(callback);
  });
}


function initializedtb(callback) {
  var user = {
    _id: toObjectID("allids"),
    ids : []
  }
  this.insert(user, callback);
}


col.bind({
  addConnected : addConnected,
  delConnected : delConnected,
  getConnectedPpl : getConnectedPpl,
  initializedtb : initializedtb
});

module.exports = col;
