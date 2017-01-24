/**
 * Created by Javier on 11/01/2017.
 */
const mongoose = require('mongoose');
const cathegories = ['work', 'lifestyle', 'motor', 'mobile'];

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

const Product = mongoose.model('Producto', ProductSchema, 'Producto');

module.exports = cathegories;