var express = require("express");


    function start() {

        var app = express();
        var passport = require('passport');
        var session = require('express-session');
        var bodyParser = require('body-parser');
        var env = require('dotenv').load();

        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized:true})); // session secret
        app.use(passport.initialize());
        app.use(passport.session());

        app.set("view engine", "ejs");

        var models = require("./app/models");

        require('./routes/index')(app, passport);

        require('./config/passport.js')(passport, models.user);

//Sync Database
        models.sequelize.sync().then(function() {
            console.log('Nice! Database looks fine')
        }).catch(function(err) {
            console.log(err, "Something went wrong with the Database Update!")
        });

        app.use("/css", express.static("css"));
        app.use("/js", express.static("js"));

        app.use('/profile', bodyParser.urlencoded({
            extended: true
        }));

        app.listen(3030);
    }



exports.start = start;