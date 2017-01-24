/**
 * Created by Javier on 19/01/2017.
 */
'use-strict';
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const localConfig = require('../../config');
const bcrypt = require('bcrypt-nodejs');
const message = require('../../languajes/dictionary');

router.post('/login', function (req, res, next) {
    const password = req.body.password;
    const userEmail = req.body.email;
    var user = {};

    const header = req.headers;

    // Buscamos en la DB al usuario con esas credenciales (email) y comprobamos password: User.find({username: userName}) ...
    if (!password || !userEmail) {
        //return next(new Error('Invalid credentials'));
        return next(new Error(message(header,'INVALID CREDENTIALS')));
    }
    User.findOne({email: req.body.email}, function(err, user) {
        if(err) {
            return next(new Error(message(header,'INVALID CREDENTIALS')));
            //return next(new Error('Invalid credentials'));
        } else {
            if(!user) {
                return next(new Error(message(header,'USER_NOT_FOUND')));
                //return next(new Error('User not found'));
            } else {
                // Comprobamos password
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    //  Acceso garantizado: creamos token
                    const token = jwt.sign({_id: user._id}, localConfig.jwt.secret, {
                        expiresIn: localConfig.jwt.expiresIn
                    });
                    //  Respondemos al usuario
                    res.json({success: true, token: token, expires: localConfig.jwt.expiresIn});
                }
                else {  //  No Ok
                    return next(new Error(message(header,'INVALID CREDENTIALS')));
                    //return next(new Error('Invalid Credentials'));
                }
            }
        }
    });

});

router.post('/register', function (req, res, next) {
    const usuario = new User(req.body);
    const header = req.headers;


    if (!req.body.username || !req.body.password || !req.body.email) {
        return next(new Error(message(header,'INVALID CREDENTIALS')));
        //return next(new Error('Invalid credentials'));
    }

    usuario.password = require('../../middleware/hashCrypt')(usuario.password);

    usuario.save(function(err) {
        if (err) {
            return next(new Error(message(header,'USER ALREADY EXISTS')));
            //return next(new Error('User already exists'));
        }
        res.json({success: true, urlLogin: localConfig.loginUrl});
    });

});


module.exports = router;