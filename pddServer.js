var express = require('express');//引入express

var bodyParser = require('body-parser');//引入post数据解析
var request = require("request");//引入向第三方发送请求的插件
var app = express();
app.use(bodyParser.urlencoded({}));//使用post数据解析中间件


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



// 导航条
app.use('/api/home/topNavBar',function(req,res){
    var api = 'http://apiv4.yangkeduo.com/api/fiora/v2/home_operations';
    request(api,function(error,response,body){
        res.send(response.body)
    })

});

// 轮播图
app.use('/api/home/scrollAD',function(req,res){
    var api='http://apiv4.yangkeduo.com/api/fiora/bannerindex/query/platform?platform=0&version=2';
    request(api,function(error,response,body){
        res.send(response.body)
    })

});

// 首页
app.use('/api/home/home',function(req,res){
    var page='';
    //判断请求方式解析参数
    if(req.method=='GET'){
        page=req.query.page;
    }else if(req.method=='POST'){
        page=req.body.page;
    }

    var api=`http://apiv4.yangkeduo.com/v5/goods?&page=${page}`;
    request(api,function(error,response,body){
        res.send(response.body)
    })

});

// 新品
app.use('/api/New',function(req,res){
    var page='';
    //判断请求方式解析参数
    if(req.method=='GET'){
        page=req.query.page;
    }else if(req.method=='POST'){
        page=req.body.page;
    }
    var api=`http://apiv3.yangkeduo.com/v5/newlist?page=${page}&size=20&list_id=1581488282&ver=0`
    request(api,function(error,response,body){
        res.send(response.body)
    })

});

// 搜索
app.use('/api/Search',function(req,res){
    var api=`http://apiv4.yangkeduo.com/operations`
    request(api,function(error,response,body){
        res.send(response.body)
    })

});

// 聊天
app.use('/api/Chat',function(req,res){
    var page='';
    //判断请求方式解析参数
    if(req.method=='GET'){
        page=req.query.page;
    }else if(req.method=='POST'){
        page=req.body.page;
    }
    // page为0以上的20整除的数字
    var api=`http://apiv4.yangkeduo.com/api/barrow/query?app_name=new_chat_list&count=20&pdduid=8352521472&offset=${page}&list_id=3791401602`
    request(api,function(error,response,body){
        res.send(response.body)
    })

});

// 个人中心
app.use('/api/Person',function(req,res){
    var page='';
    //判断请求方式解析参数
    if(req.method=='GET'){
        page=req.query.page;
    }else if(req.method=='POST'){
        page=req.body.page;
    }
    // page为0以上的20整除的数字
   var api= `http://apiv4.yangkeduo.com/api/barrow/query?app_name=personal&count=20&pdduid=8352521472&offset=${page}&list_id=1763485404`;
    request(api,function(error,response,body){
        res.send(response.body)
    })
});

// 商品列表
app.use('/api/GoodList',function(req,res){

    var goodId='';
    //判断请求方式解析参数
    if(req.method=='GET'){
        goodId=req.query.goodId;
    }else if(req.method=='POST'){
        goodId=req.body.goodId;
    }
    // page为0以上的20整除的数字
   var api= `http://apiv4.yangkeduo.com/api/oak/v6/goods/${goodId}?goods_id=${goodId}`;
    request(api,function(error,response,body){
        res.send(response.body)
    })

});

// 商品评价
app.use('/api/GoodListPJ',function(req,res){
    var goodId='';
    var page='';
    //判断请求方式解析参数
    if(req.method=='GET'){
        goodId=req.query.goodId;
        page=req.query.page;
    }else if(req.method=='POST'){
        goodId=req.body.goodId;
        page=req.body.page;
    }
    var api=  `http://apiv3.yangkeduo.com/reviews/${goodId}?page=${page}&label=1&size=2`;
            request(api,function(error,response,body){
            res.send(response.body)
        })

});

// 登陆
app.use('/api/Login',function(req,res){
    // res.setHeader('Access-Control-Allow-Origin','*');
    var Id;
    var pass;
    var returnValue={};
    //判断请求方式解析参数
    if(req.method=='GET'){
        Id=req.query.Id;
        pass=req.query.pass;       
    }else if(req.method=='POST'){
        Id=req.body.Id;
        pass=req.body.pass;
    }

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
app.use('/api/Enroll',function(req,res){
    var Id;
    var pass;
    //判断请求方式解析参数
    if(req.method=='GET'){
        Id=req.query.Id;
        pass=req.query.pass;       
    }else if(req.method=='POST'){
        Id=req.body.Id;
        pass=req.body.pass;
    }

    if(userId.length>0){
        for(var i=0;i<userId.length;i++){
            if(userId[i].Id==Id){
                // console.log('查找到相等的Id')
                res.send(false);
                return
            }
        }
    }
    var obj={};
    obj.Id=Id;
    obj.pass=pass;
    obj.change=5;
    userId.push(obj);   
    res.send(userId);


});


var server = app.listen(3000,function(){
    console.log('监听端口号3000');
    console.log('密码检测的API:  http://localhost:3000/api/Login?Id&pass');
    console.log('注册账号的API:  http://localhost:3000/api/Enroll?Id&pass');
    console.log('首页导航条API:  http://localhost:3000/api/home/topNavBar');
    console.log('首页轮播图API:  http://localhost:3000/api/home/scrollAD');
    console.log('首页的首页API:  http://localhost:3000/api/home/home?page');
    console.log('新品的首页API:  http://localhost:3000/api/New?page');
    console.log('搜索的首页API:  http://localhost:3000/api/Search');
    console.log('聊天的首页API:  http://localhost:3000/api/Chat?page');
    console.log('个人中心的API:  http://localhost:3000/api/Person?page');
    console.log('商品列表的API:  http://localhost:3000/api/GoodList?goodId');//比如goodId=141998198
    console.log('商品评价的API:  http://localhost:3000/api/GoodListPJ?goodId&page');



});