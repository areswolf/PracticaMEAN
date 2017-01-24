/**
 * Created by Javier on 23/01/2017.
 */
'use-strict';

const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');

module.exports = function encriptaRes (password) {
    // Este cálculo no es asíncrono, por ser muy rápido
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    return (hash);

};

