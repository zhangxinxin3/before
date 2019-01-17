var express = require('express');
var router = express.Router();

var classify = require('./classifyAPI/item.js');

//查询所有的icon
router.get('/classify/icon', classify.icon);

//添加分类的接口
router.get('/classify/add', classify.add);

//查询分类的接口
router.get('/classify/find', classify.find);

module.exports = router;