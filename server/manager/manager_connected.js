var daoConn = require('../dao/dao_connected');

function addConnected(id, ckb){
  daoConn.addConnected(id, ckb);
}


function delConnected(id, ckb){
  daoConn.delConnected(id, ckb);
}

function getConnectedPpl(ckb){
  daoConn.getConnectedPpl(ckb);
}

function initializedtb(ckb){
  daoConn.initializedtb(ckb);
}

module.exports = {
  addConnected : addConnected,
  delConnected : delConnected,
  getConnectedPpl : getConnectedPpl,
  initializedtb : initializedtb
};
