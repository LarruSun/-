var express = require('express');
var app = express();
var request = require("request");
var userId=[]
//解决跨域的问题
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

//店铺推荐:http://apiv4.yangkeduo.com/recommendation/mall?goods_id=9705452
//评价http://apiv3.yangkeduo.com/reviews/9705452?page=1&label=1&size=2
//店铺信息http://apiv4.yangkeduo.com/mall/218799/info?future_hide=true&check_merchant_coupon=no


            // http://api.17gwx.com/index/element?client_id=5&app_version=1.3.7&os_version=6.0&device_id=863991033843661&device_info=HUAWEI+VNS-AL00&channel_name=wandoujia&app_installtime=1521114305&gender=0&network=WIFI&timestamp=1521126150&sign=2b91c759233504fba05b90af05131e76
            
            // http://api.17gwx.com/index/index?client_id=5&app_version=1.3.7&os_version=6.0&device_id=863991033843661&device_info=HUAWEI+VNS-AL00&channel_name=wandoujia&app_installtime=1521114305&gender=0&network=WIFI&timestamp=1521126151&page=0&pagesize=20&sort_type=7&last_get_time=1521126142&sign=5d1542975c5539cc90d83b686b0c9049
// 导航条
app.get('/api/home/topNavBar',function(req,res){
    var api = 'http://apiv4.yangkeduo.com/api/fiora/v2/home_operations';
    request(api,function(error,response,body){
        res.send(response.body)
    })

});
// 轮播图
app.get('/api/home/scrollAD',function(req,res){
    var api='http://apiv4.yangkeduo.com/api/fiora/bannerindex/query/platform?platform=0&version=2';
    request(api,function(error,response,body){
        res.send(response.body)
    })

});
// 首页
app.get('/api/home/home',function(req,res){
    var page=req.query.page;
    var api=`http://apiv4.yangkeduo.com/v5/goods?&page=${page}`;
    request(api,function(error,response,body){
        res.send(response.body)
    })

});
// 新品
app.get('/api/New',function(req,res){
    var page=req.query.page;
    var api=`http://apiv3.yangkeduo.com/v5/newlist?page=${page}&size=20&list_id=1581488282&ver=0`
    request(api,function(error,response,body){
        res.send(response.body)
    })

});
// 搜索
app.get('/api/Search',function(req,res){
    var api=`http://apiv4.yangkeduo.com/operations`
    request(api,function(error,response,body){
        res.send(response.body)
    })

});
// 聊天
app.get('/api/Chat',function(req,res){
    var page=req.query.page;
    // page为0以上的20整除的数字
    var api=`http://apiv4.yangkeduo.com/api/barrow/query?app_name=new_chat_list&count=20&pdduid=8352521472&offset=${page}&list_id=3791401602`
    request(api,function(error,response,body){
        res.send(response.body)
    })

});
// 个人中心
app.get('/api/Person',function(req,res){
    var page=req.query.page;
    // page为0以上的20整除的数字
   var api= `http://apiv4.yangkeduo.com/api/barrow/query?app_name=personal&count=20&pdduid=8352521472&offset=${page}&list_id=1763485404`;
    request(api,function(error,response,body){
        res.send(response.body)
    })
});
// 商品列表
app.get('/api/GoodList',function(req,res){
    var goodsId=req.query.goodId;
    // page为0以上的20整除的数字
   var api= `http://apiv4.yangkeduo.com/api/oak/v6/goods/${goodsId}?goods_id=${goodsId}`;
    request(api,function(error,response,body){
        res.send(response.body)
    })

});

// 商品评价
app.get('/api/GoodListPJ',function(req,res){
 
    var goodsId=req.query.goodId;
    var page=req.query.page;
    var api=  `http://apiv3.yangkeduo.com/reviews/${goodsId}?page=${page}&label=1&size=2`;
       

            request(api,function(error,response,body){
            res.send(response.body)
        })

});






// 登陆
app.get('/api/Login',function(req,res){
    var Id=req.query.Id;
    var pass=req.query.pass;
    var returnValue={};
    // flag的值是-1用户名错误,0密码错误,1正确
    for(var i=0 ;i<userId.length;i++){
        if(Id == userId[i].Id){
            if(pass==userId[i].pass){
                returnValue.flag=1;
                userId[i].change=5;
                returnValue.change=userId.change;
                res.send(returnValue);
                return;
            }else{
                userId[i].change--;
                returnValue.flag=0;
                returnValue.change=userId[i].change;
                if(userId[i].change==0){
                    userId[i].Id='账户已被锁定'
                }   
                res.send(returnValue);
                return;
            }

        }
    }
    //跳出for循环说明没有找到用户名
    returnValue.flag=-1;
    returnValue.change=userId.change;
    res.send(returnValue)
    
    
});
//注册
app.get('/api/Enroll',function(req,res){
    if(userId.length>0){
        for(var i=0;i<userId.length;i++){
            if(userId[i].Id==req.query.Id){
                // console.log('查找到相等的Id')
                res.send(false);
                return
            }
        }
    }
    var obj={};
    obj.Id=req.query.Id;
    obj.pass=req.query.pass;
    obj.change=5;
    userId.push(obj);   
    res.send(userId);


});


var server = app.listen(3000,function(){
    console.log('监听端口号3000');
    console.log('密码检测的API:  http://localhost:3000/api/Login');
    console.log('注册账号的API:  http://localhost:3000/api/Enroll');
    console.log('首页导航条API:  http://localhost:3000/api/home/topNavBar');
    console.log('首页轮播图API:  http://localhost:3000/api/home/scrollAD');
    console.log('首页的首页API:  http://localhost:3000/api/home/home');
    console.log('新品的首页API:  http://localhost:3000/api/New');
    console.log('搜索的首页API:  http://localhost:3000/api/Search');
    console.log('聊天的首页API:  http://localhost:3000/api/Chat');
    console.log('个人中心的API:  http://localhost:3000/api/Person');
    console.log('商品列表的API:  http://localhost:3000/api/GoodList');
    console.log('商品评价的API:  http://localhost:3000/api/GoodListPJ');



});