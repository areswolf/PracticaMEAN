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

router.post('/login', function (req, res, next) {
    const password = req.body.password;
    const userEmail = req.body.email;
    var user = {};

    console.log('DEBUG---LOGIN---');
    // Buscamos en la DB al usuario con esas credenciales (email) y comprobamos password: User.find({username: userName}) ...
    if (!password || !userEmail) {
        res.json({success: false, message: 'Invalid credentials'});
        console.log('DEBUG: datos incompletos');
        return;
    }
    User.findOne({email: req.body.email}, function(err, user) {
        if(err) {
            console.log('DEBUG: Invalid credentials 2', err);
            res.json({success: false, message: 'Invalid credentials'});
        } else {
            if(!user) {
                console.log('DEBUG: User not found');
                res.json({success: false, message: 'User not found'});
            } else {
                console.log('DEBUG: user: ', user);
                // Comprobamos password
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    console.log('DEBUG: PASSWORD CORRECTA');
                    //  Acceso garantizado: creamos token
                    const token = jwt.sign({_id: user._id}, localConfig.jwt.secret, {
                        expiresIn: localConfig.jwt.expiresIn
                    });
                    console.log('DEBUG: TOKEN: ',token);
                    //  Respondemos al usuario
                    res.json({success: true, token: token, expires: localConfig.jwt.expiresIn});
                }
                else {  //  No Ok
                    console.log('DEBUG: PASSWORD NO COINCIDE');
                    res.json({success: false, message: 'Invalid Credentials'});
                }
            }
        }
    });




});

router.post('/register', function (req, res, next) {
    const usuario = new User(req.body);

    if (!req.body.username || !req.body.password || !req.body.email) {
        res.json({success: false, message: 'Invalid credentials'});
        return next(new Error('Invalid credentials'));
    }

    usuario.password = require('../../middleware/hashCrypt')(usuario.password);

    usuario.save(function(err) {
        if (err) {
            res.json({success: false, message: 'user already exists'});
            return;
        }
        res.json({success: true, urlLogin: localConfig.loginUrl});
    });

});


module.exports = router;