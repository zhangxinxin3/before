var mongo = require('mongodb-curd');
var dbBase = 'day12';
var addBillList = 'billList';
var addColl = 'user'; //分类
var adduser = 'infor'; //用户

//添加账单
var addBill = function(req, res, next) {
    var parame = req.body,
        type = parame.type * 1,
        iname = parame.iname,
        money = parame.money,
        time = parame.time,
        uid = parame.uid,
        cid = parame.cid,
        cname = parame.cname;
    if (!type || !iname || !money || !time || !cname || !uid || !cid) {
        res.send({
            code: 2,
            message: "参数错误"
        });
    } else {
        addBills();
    };

    function addBills() {
        mongo.find(dbBase, adduser, { _id: uid }, function(result) {
            if (result.length > 0) {
                classify();
            } else {
                res.send({
                    code: 1,
                    message: "没有此用户"
                });
            }
        });
    }

    function classify() {
        mongo.find(dbBase, addColl, { _id: cid }, function(result) {
            if (result.length > 0) {
                // console.log(result);
                add();
            } else {
                res.send({
                    code: 1,
                    message: "没有此分类"
                });
            }
        });
    }

    function add() {
        parame.time = new Date(parame.time);
        mongo.insert(dbBase, addBillList, parame, function(result) {
            if (result) {
                // console.log(result);
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
}

//查找账单
var getBill = function(req, res, next) {
    var parame = req.query,
        uid = parame.uid,
        cname = parame.cname.split(','),
        time = parame.time,
        maxTime;
    console.log(parame);
    if (!uid || !time || !cname) {
        res.send({ code: 2, message: "参数缺少" });
    } else {
        if (time.indexOf('-') != -1) {
            var timeAll = time.split('-');
            if (timeAll[1] == '12') {
                maxTime = (timeAll[0] * 1 + 1) + '-01'
            } else {
                maxTime = timeAll[0] + '-0' + (timeAll[1] * 1 + 1)
            }
        } else {
            maxTime = time * 1 + 1 + ''
        }
        getTime();
    }

    function getTime() {
        console.log(maxTime, time);
        mongo.find(dbBase, addBillList, {
            time: { $lt: new Date(maxTime), $gte: new Date(time) },
            uid: uid,
            cname: { $in: cname }
        }, function(result) {
            console.log(result);
            if (result.length > 0) {
                res.send({
                    code: 0,
                    message: "筛选成功",
                    data: result
                });
            } else {
                res.send({
                    code: 1,
                    message: "筛选失败"
                });
            }
        });
    }
}

var delBill = function(req, res, next) {
    var parame = req.query,
        id = parame.id;
    mongo.remove(dbBase, addBillList, { _id: id }, function(result) {
        if (result.length > 0) {
            res.send({
                code: 0,
                message: '删除成功'
            });
        } else {
            res.send({
                code: 1,
                message: '删除失败'
            });
        }
    });
}

module.exports = {
    addBill: addBill,
    getBill: getBill,
    delBill: delBill
}