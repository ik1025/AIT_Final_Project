const express = require('express');
const app = express();
var port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const router = express.Router();

app.use(bodyParser.urlencoded({extended: false}));
const publicPath = path.resolve(__dirname,"public");
app.use(express.static(publicPath));
app.set('view engine', 'hbs');

app.use(morgan('dev'));
app.use(cookieParser());

app.use(session({ secret: 'ilovescotchscotchyscotchscotch' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


require('./config/passport')(passport);

require('./application/models/user.js');

require('./config/db.js');

require('./application/routes.js')(app,passport);

module.exports = router;
app.listen(process.env.PORT || 3000);