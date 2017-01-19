/**
 * Created by Javier on 11/01/2017.
 */
'use-strict';

//const MongoCliente = require('mongodb');

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

        // Cerramos conexión
        db.close();
        console.log('FIN...');
        process.exit(1);
    });


});

var insertDocuments = function(db, callback) {
    // Obtenemos la colección
    var collection = db.collection('Producto');
    // Insert some documents
    // Y creamos indice
    //collection.ensureIndex({name: "text"});
    createTextIndex(db, function() {
        collection.insertMany([
            {
                name: "Bicicleta roja",
                saleOrSeek: "SALE",
                price: 230.15,
                picture: "bici.jpg",
                tags: [ "lifestyle", "motor"]
            },
            {
                name: "Patin",
                saleOrSeek: "SEEK",
                price: 80.20,
                picture: "patin.jpg",
                tags: [ "lifestyle"]
            }
        ], function(err, result) {
            assert.equal(err, null);
            assert.equal(2, result.result.n);
            assert.equal(2, result.ops.length);
            console.log("Insertados elementos");
            callback(result);
        });
    });
};

var dropDB = function(db) {
    db.dropDatabase ('Producto');
    console.log("Datos borrados");
    return;
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