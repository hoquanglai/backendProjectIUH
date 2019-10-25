var Address = require('../models/address');

exports.getAll = function (req, res) {

    Address.find(function(err, todos) {
            if (err) {
                console.log(err);
            } else {
                res.json(todos);
                console.log(todos);
            }
        }
    );
};