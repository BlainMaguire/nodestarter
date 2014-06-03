'use strict';
var mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    nconf = require('nconf');


var userModel = function () {

        var userSchema = mongoose.Schema({
            username: { type: String, unique: true, lowercase: true, required: true },  //Ensure logins are unique.
            password: { type: String, required: true } //We'll store bCrypt hashed passwords.  Just say no to plaintext!
        });

        /**
         * Helper function that hooks into the 'save' method, and replaces plaintext passwords with a hashed version.
         */
        userSchema.pre('save', function (next) {
            var user = this;

            //If the password hasn't been modified in this save operation,
            // leave it alone (So we don't double hash it)
            /*if (!user.isModified('password')) {
                next();
                return;
            }*/

            //Encrypt and salt using bCrypt.
            var passwordHash =  bcrypt.hashSync(user.password, 10);
            
            user.password = passwordHash;
            //Continue with the save operation
            next();
        });

        /**
         * Helper function that takes a plaintext password and compares it against the user's hashed password.
         * @param plainText
         * @returns true/false
         */
        userSchema.methods.passwordMatches = function (plainText) {
            var user = this;
            return bcrypt.compareSync(plainText, user.password);
        };


        return mongoose.model('User', userSchema);
    };

module.exports = new userModel();
