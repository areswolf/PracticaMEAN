/**
 * Created by Javier on 18/01/2017.
 */
'use-strict';
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Producto = mongoose.model('Producto');
const jwtAuth = require('../../middleware/jwtAuth');

router.use(jwtAuth());

router.get('/', function(req, res, next) {
    const name = req.query.name;
    const saleOrSeek = req.query.saleOrSeek;
    const max_price = parseInt(req.query.max_price);
    const min_price = parseInt(req.query.min_price);
    const tags = req.query.tags;
    const page = parseInt(req.query.page);
    const sort = req.query.sort;

    var skip = 0;
    const limit = 10;

    const filter = {};

    console.log('REQ: ', req.query);

    if (name) {
        filter.$text = { $search: name };
    }
    if (saleOrSeek) {
        if (saleOrSeek==='SALE' || saleOrSeek==='SEEK') {
            filter.saleOrSeek = saleOrSeek;
        }
    }
    if (tags) {
        filter.tags = tags;
    }
    if (page) {
        skip = page*limit;
    }
    if (max_price && !min_price) {
        filter.price = { $lt: max_price};
    }
    if (!max_price && min_price) {
        filter.price = { $gt: min_price};
    }
    if (max_price && min_price) {
        filter.price = { $gt: min_price, $lt: max_price};
    }

    Producto.list(filter, limit, skip, sort, function (err, docs) {
        if (err) {
            res.json({success: false, error: err});
            return next(err);
        }
        res.json({success: true, data: docs});
    });

});

module.exports = router;
