/**
 * Created by Javier on 11/01/2017.
 */
'use-strict';
const mongoose = require('mongoose');
const cathegories = ['work', 'lifestyle', 'motor', 'mobile'];
const localConfig = require('../config');

const ProductSchema = mongoose.Schema({
    name: String,
    saleOrSeek: {type: String, enum: ['SALE', 'SEEK']},
    price: {type: Number, default: 0 },
    picture: String,
    tags: {type: String, enum: cathegories}
});

ProductSchema.statics.list = function(filter, limit, skip, sort, cb) {
    const query = Product.find(filter);
    query.limit (limit);
    query.skip (skip);
    query.sort (sort);
    query.exec(cb);

};


ProductSchema.pre('save', function(next, done) {
    const self = this;
    const ruta = localConfig.baseEndPoint + ':' + localConfig.port + '/' + localConfig.productPublicimageResource + '/' + self.picture;

    self.picture = ruta;
    next();
});

const Product = mongoose.model('Producto', ProductSchema, 'Producto');

module.exports = cathegories;