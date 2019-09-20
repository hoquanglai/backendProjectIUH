var express = require('express');
var bodyParser = require('body-parser');

var product = require('./routes/product'); // Imports routes for the products
var account = require('./routes/account'); // Imports routes for the products
var login = require('./routes/login');
var mongoose = require('mongoose');
var app = express();
var session = require('express-session')
const passport = require('passport')

// const url = "mongodb+srv://admin:admin@cluster0-gz3cj.mongodb.net/doanDB?retryWrites=true&w=majority";
const url = "mongodb://localhost:27017/doanDB";

var mongoDB = process.env.MONGODB_URI || url;
mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.once('open', function() {
    console.log("MongoDB database connection established successfully");
})
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/product', product);
app.use('/account', account);
app.use('/', login);

app.use(
	session({
		secret: 'fraggle-rock', //pick a random string to make the hash that is generated secure
		// store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: false, //required
		saveUninitialized: false //required
	})
)

app.use(passport.session())

var port = 5000;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});
