var express = require('express');
var app = express();
var request = require("request");
var querystring = require('querystring')//post 请求

var loginMess={
    user:0,
    authCodeData:`习近平主席夫人彭丽媛全国人大常委会副委员长吉炳轩国务委员兼外交部部长王毅全国政协副主席马飚何立峰等出席欢迎仪式`,
    indexs:[],
    loginAuthCode:[]
}
//解决跨域的问题
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
// 轮播图
app.get('/api/home/scrollAD',function(req,res){
    var api='https://m.maizuo.com/v4/api/billboard/home?__t=1521794268154';
    request(api,function(error,response,body){
        res.send(response.body)
    })

});
// 正在热映
app.get('/api/home/NowPlaying',function(req,res){
    var page=req.query.page;
    var count=req.query.count;

    var api=`https://m.maizuo.com/v4/api/film/now-playing?__t=1521795310395&page=${page}&count=${count}`;
    request(api,function(error,response,body){
        res.send(response.body)
    })

});


// 即将上映
app.get('/api/home/ComePlaying',function(req,res){
    var page=req.query.page;
    var count=req.query.count;
    var api= `https://m.maizuo.com/v4/api/film/coming-soon?__t=1521952256109&page=${page}&count=${count}`;
    request(api,function(error,response,body){
        res.send(response.body)
    })

});

// 影院正在上映
app.get('/api/flim/NowPlaying',function(req,res){
    var page=req.query.page;
    var count=req.query.count;
    var api= `https://m.maizuo.com/v4/api/film/now-playing?page=${page}&count=${count}`;
    request(api,function(error,response,body){
        res.send(response.body)
    })

});

// 影院即将上映
app.get('/api/flim/ComPlaying',function(req,res){
    var page=req.query.page;
    var count=req.query.count;
    var api= `https://m.maizuo.com/v4/api/film/coming-soon?page=${page}&count=${count}`;
    request(api,function(error,response,body){
        res.send(response.body)
    })

});


// 电影详情
app.get('/api/flim/List',function(req,res){
    var listId=req.query.id;
    var api= `https://m.maizuo.com/v4/api/film/${listId}`;
    request(api,function(error,response,body){
        res.send(response.body)
    })

});
// https://m.maizuo.com/v4/api/cinema




// 电影院
app.get('/api/cinema',function(req,res){
    var listId=req.query.id;
    var api= `https://m.maizuo.com/v4/api/cinema`;
    request(api,function(error,response,body){
        res.send(response.body)
    })

});
// 电影院详情
app.get('/api/cinemaList',function(req,res){
    var listId=req.query.listId;

    var api=`https://m.maizuo.com/v4/api/cinema/${listId}`;
    request(api,function(error,response,body){
        res.send(response.body)
    })

});







// 发送验证码
app.get('/api/sendAuthCode',function(req,res){
    // var loginMess={
    //     user:0,
    //     authCodeData:`习近平主席夫人彭丽媛全国人大常委会副委员长吉炳轩国务委员兼外交部部长王毅全国政协副主席马飚何立峰等出席欢迎仪式`,
    //     indexs:[],
    //     loginAuthCode:[]
    // }
    var totleArr=[];
    var isRepace=false;
    loginMess.indexs.length=0;
    loginMess.user=req.query.userId;
    loginMess.loginAuthCode=[];
    var num2=loginMess.authCodeData.length;
    var num1=0;
    //生成16个随验证码
    for(var i=0;i<16;i++){
        var index=Math.floor(Math.random()*(num2-num1)+num1);
        totleArr.push(loginMess.authCodeData[index]);
    }
    //生成4个正确的验证码
    for(let i=0;i<4;i++){
        var index=Math.floor(Math.random()*16);

        loginMess.indexs.push(index);
        loginMess.loginAuthCode.push(totleArr[index]);

    }
    //数据组装
    var data={
        totleCode:totleArr,
        sureCode:loginMess.loginAuthCode,
        index:loginMess.indexs
    }
    res.send(data);
});



// 登陆  -1表示账户名不存在 0 表示验证码错误 1表示正确
app.get('/api/login',function(req,res){
    var userId=req.query.userId;
    var loginCode=user=req.query.loginCode;
    if(userId==loginMess.user){
        for(var i=0 ; i<loginCode.length ; i++){
            if(loginCode[i]!=loginMess.loginAuthCode[i])
            {
                res.send('0');
                return;
            }
        }
        res.send('1');
    }else{
        res.send('-1');

    }
});

app.post('/api/login',function(req,res){
    // console.log('请求了数据');
    var myDatas='';
    //参数的接受
    req.on('data', function (chunk) {
        myDatas += chunk;  //一定要使用+=，如果myDatas=chunk，因为请求favicon.ico，body会等于{}
    });
    req.on('end', function () {
        // 解析参数
        // console.log(myDatas);
        myDatas = querystring.parse(myDatas);  //将一个字符串反序列化为一个对象   不同参数之间用的是&隔开
        // console.log(myDatas);  
        
        
        // 登陆的判断
        var userId=myDatas.userId;
        var loginCode=myDatas.loginCode;
        console.log(userId)
        console.log(loginCode)
        var returnObj={
            'type':'sucess',
            'data':{
                'isLogin':'-1'
            }
        };
        if(userId==loginMess.user){
            // for(var i=0 ; i<loginCode.length ; i++){
                if(loginCode!=loginMess.loginAuthCode.join('')){
                    returnObj.data.isLogin='0';
                    res.send(returnObj);
                    return;
                }
            // }
            returnObj.data.isLogin='1';
            res.send(returnObj);
        }else{
            res.send(returnObj);
        }    
    })
});






var server = app.listen(3000,function(){
    console.log('监听端口号3000');
    console.log('首页轮播图API:  http://localhost:3000/api/home/scrollAD');
    console.log('即将上映的API:  http://localhost:3000/api/home/ComePlaying');
    console.log('正在热映的API:  http://localhost:3000/api/home/NowPlaying');
    console.log('影院正在上映的API:  http://localhost:3000/api/flim/NowPlaying');
    console.log('影院即将上映的API:  http://localhost:3000/api/flim/ComPlaying');
    console.log('电影详情的API:  http://localhost:3000/api/flim/List');
    console.log('电影院的API:  http://localhost:3000/api/cinema');
    console.log('电影院详情的API:  http://localhost:3000/api/cinemaList');
    console.log('发送验证码API:  http://localhost:3000/api/sendAuthCode');
    console.log('登陆验证API:  http://localhost:3000/api/login');
});