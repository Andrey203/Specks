let fs = require("fs");

var exports = module.exports = {};

exports.profile = function(req, res) {
    console.log(req.user);
    res.render("profile", {person: req.user.username});

};

exports.logout = function(req, res) {
    req.session.destroy(function(err) {
        res.redirect('/specks');
    });
};

exports.specks = function(req, res) {
    res.render('specks');
};

exports.images = function(req, res) {
    res.writeHead(200, {"Content-Type": "image/png"}, {"Content-Type": "image/jpg"});
    fs.createReadStream("../specks" + req.url).pipe(res);
};

exports.fonts = function(req, res) {
    res.writeHead(200, {"Content-Type": "font/otf"}, {"Content-Type": "font/ttf"});
    fs.createReadStream("../specks" + req.url).pipe(res);
};