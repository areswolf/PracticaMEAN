"use strict";

const jwt = require('jsonwebtoken');
const localConfig = require('../config');

//  Middleware de autenticación
module.exports = function(){
  return function (req, res, next) {
      const token = req.get('x-access-token') || req.body.token || req.query.token;

      if (!token) {
          return next(new Error('Token not provided'));
      }
      jwt.verify(token, localConfig.jwt.secret, function (err, tokenDecoded) {
          if (err) {
              return next(new Error('Invalid token'));
          }
          req.tokenDecoded = tokenDecoded;
          next();
      });
  }
};