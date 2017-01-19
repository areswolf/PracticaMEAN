/**
 * Created by Javier on 18/01/2017.
 */
'use-strict';
const express = require('express');
const router = express.Router();
const tags = require('../../models/product');

// recuperar lista de productos
router.get('/', function(req, res, next) {
    res.json({success: true, data: tags});

});


module.exports = router;