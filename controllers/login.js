const passport = require('passport')


exports.login = function (req, res) {
    var {username, pwd} = req.body;
    if (username === 'admin' && pwd === 'admin') {
        req.session.username = username;
        return res.send('ok');
    }
    res.send('noOK');
};

exports.getInfo = function (req, res) {
    if (req.session.username) {
        return res.send(req.session.username);
    }
    res.send('no_OK');
};