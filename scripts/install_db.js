/**
 * Created by Javier on 11/01/2017.
 */
'use-strict';

const localConfig = require('../config');

console.log('COMENZANDO...');

var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/nodepop';
// Conectamos con el servidor
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Conectado correctamente");
    //  Borramos la DB, tenga lo que tenga. Aunque no exista, no produce errores
    dropDB(db);
    //  Ahora la creamos de nuevo
    insertDocuments(db, function() {
        console.log('FIN Productos insertados...');
    });
    insertUsers(db, function() {
        // Cerramos conexión
        db.close();
        console.log('FIN...');
        process.exit(1);
    });

});

var insertDocuments = function(db, callback) {
    // Obtenemos la colección
    var collection = db.collection('Producto');
    createTextIndex(db, function() {
        collection.insertMany([
            {
                name: "Bicicleta roja",
                saleOrSeek: "SALE",
                price: 230.15,
                picture: localConfig.baseEndPoint + ':' + localConfig.port + '/' + localConfig.productPublicimageResource + '/' + "bicicleta.jpg",
                tags: [ "lifestyle", "motor"]
            },
            {
                name: "Patin",
                saleOrSeek: "SEEK",
                price: 80.20,
                picture: localConfig.baseEndPoint + ':' + localConfig.port + '/' + localConfig.productPublicimageResource + '/' +  "monopatin.jpg",
                tags: [ "lifestyle"]
            }
        ], function(err, result) {
            assert.equal(err, null);
            assert.equal(2, result.result.n);
            assert.equal(2, result.ops.length);
            console.log("Insertados productos");
            callback(result);
        });
    });
};

var insertUsers = function(db, callback) {
    // Obtenemos la colección
    var collection = db.collection('User');
    createTextIndexUser(db, function() {
        collection.insertMany([
            {
                username: "Javier Ruiz",
                email: "jruiz@spartan-sys.com",
                password: "1234",
            }], function(err, result) {
                assert.equal(err, null);
                assert.equal(1, result.result.n);
                assert.equal(1, result.ops.length);
                console.log("Insertado usuario");
                callback(result);
            });
    });
};

var dropDB = function(db) {
    db.dropDatabase ('Producto');
    console.log("Datos borrados");
};

var createTextIndex = function(db, callback) {
    // Get the restaurants collection
    var collection = db.collection('Producto');
    // Create the index
    collection.createIndex(
        { name : "text" }, function(err, result) {
            console.log(result);
            callback(result);
        });
};

var createTextIndexUser = function(db, callback) {
    // Get the restaurants collection
    var collection = db.collection('User');
    // Create the index
    collection.createIndex(
        { name : "emailtext" }, function(err, result) {
            console.log(result);
            callback(result);
        });
};