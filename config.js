/**
 * Created by Javier on 11/01/2017.
 */
'use-strict';
module.exports = {
    port: 3001,
    db: 'mongodb://localhost:27017/nodepop',
    //SECRET_TOKEN: 'miclavedetokens',
    jwt: {
        secret: 'palabra-secreta-palabra-secreta-palabra-secreta',
        expiresIn: '2 days'
    },
    loginUrl: 'localhost:3000/users/login'
};
