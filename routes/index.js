var express = require('express');
// const {board} = require("../models/board");
var router = express.Router();
// const {board} = require('../models')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('board' );
});





module.exports = router;