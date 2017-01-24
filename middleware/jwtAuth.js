"use strict";

const jwt = require('jsonwebtoken');
const localConfig = require('../config');
const message = require('../languajes/dictionary');

//  Middleware de autenticación
module.exports = function(){
  return function (req, res, next) {
      const token = req.get('x-access-token') || req.body.token || req.query.token;

      const header = req.headers;

      if (!token) {
          return next(new Error(message(header,'TOKEN NOT PROVIDED')));
          //return next(new Error('TOKEN NOT PROVIDED'));
      }
      jwt.verify(token, localConfig.jwt.secret, function (err, tokenDecoded) {
          if (err) {
              return next(new Error(message(header,'INVALID TOKEN')));
              //return next(new Error('Invalid token'));
          }
          req.tokenDecoded = tokenDecoded;
          next();
      });
  }
};