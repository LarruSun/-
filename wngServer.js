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
app.get('/api/home/Top',function(req,res){
    var api='http://www.weinihaigou.com/indexMobileTop.shtml';
    request(api,function(error,response,body){
        res.send(response.body)
    })

});
// 精选好货
app.get('/api/home/goodList',function(req,res){
    var api='http://www.weinihaigou.com/indexHotList.shtml';
    request(api,function(error,response,body){
        res.send(response.body)
    })

});


// 分类左侧
app.get('/api/Fl/FlLeft',function(req,res){
    var api=`http://www.weinihaigou.com/category/getCategoryTwo.shtml`;
    request(api,function(error,response,body){
        res.send(response.body)
    })

});


// 分类右侧
app.get('/api/Fl/FlRight',function(req,res){
    var categoryId=req.query.classid;
    var api=`http://www.weinihaigou.com/category/getCategoryTwo.shtml?categoryId=${categoryId}`;
    request(api,function(error,response,body){
        res.send(response.body)
    })

});





// // post请求
// var params = new URLSearchParams()
// params.append('categoryId ', '4')
// params.append('seqNum', '7')
// var url='http://localhost:3000/api/Fl/FlRight';
// axios.post(url,params).then((axiosData)=>{
//     console.log(axiosData);
// })
// app.post('/api/Fl/FlRight',function(req,res){
//     console.log('请求了数据');
//     var myDatas='';
//     req.on('data', function (chunk) {
//         myDatas += chunk;  //一定要使用+=，如果myDatas=chunk，因为请求favicon.ico，body会等于{}
//       });
//       req.on('end', function () {
//         // 解析参数
//         myDatas = querystring.parse(datas);  //将一个字符串反序列化为一个对象
//         // console.log("myDatas:",myDatas);  
//         res.send(datas);
//     })
// });




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


var server = app.listen(3000,function(){
    console.log('监听端口号3000');
    console.log('头部API:  http://localhost:3000/api/home/Top');
    console.log('精选好货API:  http://localhost:3000/api/home/goodList');
    console.log('分类左侧:  http://localhost:3000/api/Fl/FlLeft');
    console.log('分类左侧:  http://localhost:3000/api/Fl/FlRight');

    console.log('发送验证码API:  http://localhost:3000/api/sendAuthCode');
    console.log('登陆验证API:  http://localhost:3000/api/login');
});