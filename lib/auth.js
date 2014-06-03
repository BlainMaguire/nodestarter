'use strict';

var User = require('../models/user'),
    LocalStrategy = require('passport-local').Strategy;

exports.localStrategy = function () {

    return new LocalStrategy(function (username, password, done) {

        //Retrieve the user from the database by login
        User.findOne({'username' : username}, function (err, user) {
                //If something weird happens, abort.
                if (
                   (!user || !user.passwordMatches(password))) {
                    return done(null, false, { message: 'The username or password is incorrect.' });
                }

                //If everything passes, return the retrieved user object.
                done(null, user);

            });
    });
};

exports.isAuthenticated = function (role) {

    return function (req, res, next) {

        if (!req.isAuthenticated()) {
            // If the user is not authorized,
            // save the location that was being accessed for redirection
            req.session.goingTo = req.url;
            res.redirect('/login');
            return;
        }

        next();
    };
};

exports.injectUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
};
