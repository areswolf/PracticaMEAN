/**
 * Created by Javier on 11/01/2017.
 */
'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
    username: String,
    email: {type: String, unique: true, lowercase: true},
    password: {type: String, select: true} // Cifrada
});


UserSchema.pre('save', function(next, done) {
    let self = this;

    mongoose.models["User"].findOne({email: self.email}, function(err, user) {
        if(err) {
            return next(err);
        } else if(user) {
            self.invalidate("email", "email must be unique");
            return next(new Error("email must be unique"));
        }
    });
    next();
});

UserSchema.statics.list = function(filter, cb) {
    const query = User.find(filter).exec(cb);
};


const User = mongoose.model('User', UserSchema, 'User');

//module.exports = User;
