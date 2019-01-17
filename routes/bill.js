var express = require('express');
var router = express.Router();

var bill = require('./billAPI/billAPI.js');

router.post('/bill/billList', bill.addBill);

router.get('/bill/getTime', bill.getBill);

router.get('/bill/delBill', bill.delBill)

module.exports = router;