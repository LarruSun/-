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


//头部
app.get('',function(req,res){
    // console.log(req.query.type);
    var type=req.query.type
    var cont=req.query.cont
    var cont=req.query.page
    console.log(cont);
    //////////////////////
    ////////scrollAD////////
    ////////////////////
    if(type=='scrollAD'){
        console.log('scrollAD执行了')
        var api='https://m.maizuo.com/v4/api/billboard/home?__t=1521794268154';
        request(api,function(error,response,body){
            res.send(response.body)
        })
    //////////////
    /////nowPlaying/////
    /////////////
    }else if(type=='nowPlaying'){
        console.log('nowPlaying执行了');

        var api=`https://m.maizuo.com/v4/api/film/now-playing?__t=1521795310395&page=1&count=5`;
        request(api,function(error,response,body){
            res.send(response.body)
        })
    //////////////
    /////commingPlaying/////
    /////////////
    }else if(type=='commingPlaying'){
        console.log('commingPlaying执行了');
        var api=`https://m.maizuo.com/v4/api/film/coming-soon?__t=1521795310395&page=1&count=5`;
        request(api,function(error,response,body){
            res.send(response.body)
        })
    }else if(type=='filmNowPlaying'){
        console.log('filmNowPlaying');
        var api=`https://m.maizuo.com/v4/api/film/now-playing?page=1&count=10`;
        request(api,function(error,response,body){
            res.send(response.body)
        })
    }
    
    else{
        console.log('都没执行');
        var Data={
            state:false,
            mseeage:'请求参数有问题'
        }
        
        res.send(Data)
    }





});


var server = app.listen(3000,function(){
    console.log('监听端口号3000');
    console.log('头部API:  http://localhost:3000');

});