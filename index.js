'use strict';


var kraken = require('kraken-js'),
    db = require('./lib/database'),
    passport = require('passport'),
    auth = require('./lib/auth'),
    flash = require('connect-flash'),
    User = require('./models/user'),
    app = {};


app.configure = function configure(nconf, next) {
    db.config(nconf.get('databaseConfig'));

    // Give passport a way to serialize and deserialize a user.
    // In this case, by the user's id.
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findOne({_id: id}, function (err, user) {
            done(null, user);
        });
    });
    
    //Tell passport to use our newly created local strategy for authentication
    passport.use(auth.localStrategy());
    
    next(null);
};


app.requestStart = function requestStart(server) {
    // Run before most express middleware has been registered.
};


app.requestBeforeRoute = function requestBeforeRoute(server) {
    server.use(passport.initialize());  //Use Passport for authentication
    server.use(passport.session());     //Persist the user in the session
    server.use(flash());                //Use flash for saving/retrieving error messages for the user
    server.use(auth.injectUser);        //Inject the authenticated user into the response context
};


app.requestAfterRoute = function requestAfterRoute(server) {
    // Run after all routes have been added.
};


if (require.main === module) {
    kraken.create(app).listen(function (err, server) {
        if (err) {
            console.error(err.stack);
        }
    });
}

module.exports = app;
