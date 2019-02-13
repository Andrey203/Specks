const express = require("express");
const jsonParser = express.json();
const models = require("../app/models");
const User = models.user;

const authController = require('../app/controllers/authcontroller.js');

module.exports = function (app, passport) {

    console.log("routes auth connected");

    app.get('/profile(/:name)?',isLoggedIn, authController.profile);

    app.get('/logout',authController.logout);

    app.get('/specks', authController.specks);

    app.get("/images/*(.jpg$)", authController.images);

    app.get("/fonts/*(.otf|ttf$)", authController.fonts);

    app.post("/ajaxReq", jsonParser, function(req, res, next) {

        if (!req.user) return next();
        if (req.body.moves == 0) {
            User.findAll().then(function (user) {
                res.send(user);
            }).error(function (err) {
                console.log("Error:" + err);
            });
        } else {
            User.update({movesQuantity: req.body.moves},{
                where: {username: req.user.username}
            })
                .then(function() {
                    User.findAll().then(function (user) {
                        res.send(user);
                    }).error(function (err) {
                        console.log("Error:" + err);
                    });
                });

        }

    });

    app.post('/signup', passport.authenticate('local-signup', {
            successRedirect: '/profile',
            failureRedirect: '/specks'
        }
    ));

    app.post('/specks', passport.authenticate('local-signin', {
            successRedirect: '/profile',
            failureRedirect: '/specks'
        }
    ));


    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/specks');
    }


};