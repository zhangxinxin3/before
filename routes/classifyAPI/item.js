var mongo = require('mongodb-curd');
var dbBase = 'day12';
var dbColl = 'icon'; //icon
var addColl = 'user'; //分类
//查询所有的icon
var icon = function(req, res, next) {
    mongo.find(dbBase, dbColl, function(result) {
        if (result.length > 0) {
            res.send({
                code: 0,
                message: "查询成功",
                data: result
            });
        } else {
            res.send({
                code: 1,
                message: "查询失败"
            });
        }
    });
};

//添加分类的接口
var add = function(req, res, next) {
    console.log(req.query);
    var parame = req.query,
        iname = parame.iname,
        cname = parame.cname,
        type = parame.type * 1,
        uid = parame.uid;
    console.log(iname, cname, type, uid);
    if (!iname || !cname || !type || !uid) {
        res.send({
            code: 2,
            message: "参数错误"
        });
    } else {
        findIndex();
        // insertIndex();
    }

    function findIndex() {
        mongo.find(dbBase, addColl, { iname: iname, cname: cname, type: type, uid: { $in: ['*', uid] } }, function(result) {
            if (result.length > 0) {
                res.send({
                    code: 0,
                    message: "查找成功"
                });
            } else {
                insertIndex();
            }
        });
    }

    function insertIndex() {
        mongo.insert(dbBase, addColl, { iname: iname, cname: cname, type: type, uid: uid }, function(result) {
            if (result) {
                res.send({
                    code: 0,
                    message: "添加成功"
                });
            } else {
                res.send({
                    code: 1,
                    message: "添加失败"
                });
            }
        });
    }
};
//查询分类的接口
var find = function(req, res, next) {
    var parame = req.query,
        type = parame.type * 1 ? [parame.type * 1] : [1, 2],
        uid = parame.uid;
    mongo.find(dbBase, addColl, { type: { $in: type }, uid: { $in: ["*", uid] } }, function(result) {
        console.log(result);
        if (result.length > 0) {
            res.send({
                code: 0,
                message: "查找成功",
                data: result
            });
        } else {
            res.send({
                code: 1,
                message: "查找失败"
            });
        }
    });
}

module.exports = {
    icon: icon,
    add: add,
    find: find
}