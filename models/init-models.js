var DataTypes = require("sequelize").DataTypes;
var _board = require("./board");

function initModels(sequelize) {
  var board = _board(sequelize, DataTypes);


  return {
    board,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
