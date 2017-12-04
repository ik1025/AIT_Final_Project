var mongoose = require('mongoose');

let dbconf;
if (process.env.NODE_ENV === 'PRODUCTION') {
   const fs = require('fs');
   const path = require('path');
   const fn = path.join(__dirname, 'config.json');
   const data = fs.readFileSync(fn);
   const conf = JSON.parse(data);
    dbconf = conf.dbconf;
} 
else {
 dbconf = 'mongodb://localhost/ik1025';
}

module.exports = {
	'url' : dbconf
};

mongoose.connect(dbconf);