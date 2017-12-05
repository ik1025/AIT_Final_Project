var mongoose = require('mongoose');

var Tournyz = mongoose.Schema({
	bracket : Object
  },
  {strict: false});

module.exports = mongoose.model('Tournyz', Tournyz);
