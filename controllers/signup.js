'use strict';


var SignupModel = require('../models/signup'),
    User = require('../models/user');


module.exports = function (app) {

    var model = new SignupModel();


    app.get('/signup', function (req, res) {
        
        res.render('signup', model);
        
    });
    
    app.post('/signup', function (req, res) {
        req.session.messages= [];
        var newUser = new User({  username : req.body.username,
                                  password : req.body.password
                              });
        console.log(newUser);
        newUser.save();
        res.redirect('/profile');
    });

};
