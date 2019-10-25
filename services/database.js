var mongoose = require('mongoose');

function connectDatabase() {
    const url = "mongodb+srv://admin:admin@cluster0-gz3cj.mongodb.net/doanDB?retryWrites=true&w=majority";
    // const url = "mongodb://localhost:27017/doanDB";

    var mongoDB = process.env.MONGODB_URI || url;
    mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true });
    mongoose.Promise = global.Promise;
    var db = mongoose.connection;
    db.once('open', function() {
        console.log("MongoDB database connection established successfully");
    })
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}

module.exports = {
    connectDatabase
}