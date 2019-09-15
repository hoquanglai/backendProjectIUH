var express = require('express');
var bodyParser = require('body-parser');

var product = require('./routes/product'); // Imports routes for the products
var account = require('./routes/account'); // Imports routes for the products
var mongoose = require('mongoose');
var app = express();

const url = "mongodb+srv://admin:admin@cluster0-gz3cj.mongodb.net/doanDB?retryWrites=true&w=majority";

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

var port = 5000;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});
