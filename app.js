// var express = require('express');
// var bodyParser = require('body-parser');

// var product = require('./routes/product'); // Imports routes for the products
// var account = require('./routes/account'); // Imports routes for the products
// var login = require('./routes/login');
// var mongoose = require('mongoose');
// var app = express();
// var session = require('express-session')
// const passport = require('passport')

// const url = "mongodb+srv://admin:admin@cluster0-gz3cj.mongodb.net/doanDB?retryWrites=true&w=majority";
// // const url = "mongodb://localhost:27017/doanDB";

// var mongoDB = process.env.MONGODB_URI || url;
// mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true });
// mongoose.Promise = global.Promise;
// var db = mongoose.connection;
// db.once('open', function() {
//     console.log("MongoDB database connection established successfully");
// })
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));
// app.use('/product', product);
// app.use('/account', account);
// app.use('/', login);

// app.use(
// 	session({
// 		secret: 'fraggle-rock', //pick a random string to make the hash that is generated secure
// 		// store: new MongoStore({ mongooseConnection: dbConnection }),
// 		resave: false, //required
// 		saveUninitialized: false //required
// 	})
// )

// app.use(passport.session())

// var port = 5000;

// app.listen(port, () => {
//     console.log('Server is up and running on port numner ' + port);
// });
require('dotenv').config();
const webServer = require('./services/web-service.js');
const database = require('./services/database.js');

async function startup() {
	console.log('Starting application');

	try {
		console.log('Initializing database module');
		await database.connectDatabase();
	} catch (err) {
		console.error(err);

		process.exit(1);
	}

	try {
		console.log('Initializing web server module');
		await webServer.initialize();
	} catch (err) {
		console.error(err);

		process.exit(1);
	}
}

startup();

async function shutdown(e) {
	let err = e;
	console.log('Shutting down');
	try {
		console.log('Closing web server module');

		await webServer.close();
	} catch (error) {
		console.log('Encountered error', e);

		err = err || e;
	}

	console.log('Exiting process');

	if (err) {
		process.exit(1); // Non-zero failure code
	} else {
		process.exit(0);
	}
}

process.on('SIGTERM', () => {
	console.log('Received SIGTERM');

	shutdown();
});

process.on('SIGINT', () => {
	console.log('Received SIGINT');

	shutdown();
});

process.on('uncaughtException', err => {
	console.log('Uncaught exception');
	console.error(err);

	shutdown(err);
});