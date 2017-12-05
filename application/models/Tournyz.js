var mongoose = require('mongoose');

var Tournyz = mongoose.Schema({
	title : String,
	bracket : Object
  },
  {strict: false});

module.exports = mongoose.model('Tournyz', Tournyz);
