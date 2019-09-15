var Account = require('../models/account');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    //res.send('Greetings from the Test controller!');
        console.log(" a--------------")
    var account = new Account(
        {
            name: "Ho Quang Lai",
            pwd: "quanglai123",
            phone: 0916594249,
            description: "abc",
            adress: "abcs"
        }
    );
    account.save(function (err) {
        if (err) {
            return next(err);
        }
        // res.send('Account Created successfully')
    })
    Account.find(function(err, todos) {
            if (err) {
                console.log(err);
            } else {
                res.json(todos);
                console.log(todos);
            }
        }
    );
};

exports.Account_create = function (req, res) {
    var Account = new Account(
        {
            name: req.body.name,
            price: req.body.price
        }
    );

    Account.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Account Created successfully')
    })
};

exports.Account_details = function (req, res) {
    Account.findById(req.params.id, function (err, Account) {
        // if (err) return next(err);
        // res.send(Account);
    })
};

exports.Account_update = function (req, res) {
    Account.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, Account) {
        if (err) return next(err);
        res.send('Account udpated.');
    });
};

exports.Account_delete = function (req, res) {
    Account.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};