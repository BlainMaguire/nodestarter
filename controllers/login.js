'use strict';

var LoginModel = require('../models/login'),
    passport = require('passport');


module.exports = function (app) {

    var model = new LoginModel();

    /**
     * Display the login page. We also want to display any error messages that result from a failed login attempt.
     */
    app.get('/login', function (req, res) {

        //console.log(req);
        //Include any error messages that come from the login process.
        model.messages = req.session.messages;
        res.render('login', model);
    });

    /**
     * Receive the login credentials and authenticate.
     * Successful authentications will go to /profile or if the user was trying to access a secured resource, the URL
     * that was originally requested.
     *
     * Failed authentications will go back to the login page with a helpful error message to be displayed.
     */
    app.post('/login', function (req, res) {
        req.session.messages= []
        passport.authenticate('local', {
            successRedirect: req.session.goingTo || '/profile',
            failureRedirect: '/login',
            failureMessage: "Invalid username or password",
            failureFlash: true
        })(req,res);
        if (req.body.remember) {
          req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 14;
        } else {
          req.session.cookie.expires = false;
        }
    });

    /**
     * Allow the users to log out
     */
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

};
