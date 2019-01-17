var express = require('express');
var router = express.Router();
var mongo = require('mongodb-curd');
var dbBase = 'day12';
var dbColl = 'infor';

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/list', function(req, res, next) {
    mongo.insert(dbBase, dbColl, req.body, function(result) {
        if (result) {
            res.send({
                code: 0,
                message: "添加成功",
                data: result.ops[0]._id
            });
        } else {
            res.send({
                code: 1,
                message: "添加失败"
            });
        }
    });
});

module.exports = router;