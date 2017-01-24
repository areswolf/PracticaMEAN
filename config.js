/**
 * Created by Javier on 11/01/2017.
 */
'use-strict';
module.exports = {
    port: 3000,
    db: 'mongodb://localhost:27017/nodepop',
    jwt: {
        secret: 'palabra-secreta-palabra-secreta-palabra-secreta',
        expiresIn: '2 days'
    },
    loginUrl: 'localhost:3000/users/login',
    baseEndPoint: 'localhost',
    productPublicimageResource: 'images/productos'
};
