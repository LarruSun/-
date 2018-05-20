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
//首页图片点进去后的API
app.get('/api/home/enterImg',function(req,res){
    var id=req.query.id;
    var api=`http://www.weinihaigou.com/solr/searchGoods.shtml?themeId=${id}`;
    request(api,function(error,response,body){
        res.send(response.body)
    })

});

//限时抢购图片点进去的API
app.get('/api/home/timeBuy',function(req,res){
    var api=`http://www.weinihaigou.com/goods/activityList.shtml?flag=1&page=1`;
    request(api,function(error,response,body){
        res.send(response.body)
    })

});
//当季热卖图片点进去的API
app.get('/api/home/hotBuy',function(req,res){
    var page=req.query.page;
    var api=`http://www.weinihaigou.com/solr/searchGoods.shtml?pageNum=${page}`;
    request(api,function(error,response,body){
        res.send(response.body)
    })

});

//国家馆
app.get('/api/home/counter',function(req,res){
    var api=`http://www.weinihaigou.com/goods/queryCountryList.shtml`;
    request(api,function(error,response,body){
        res.send(response.body)
    })

});
//品牌街
app.get('/api/home/ppj',function(req,res){
    var api=`http://www.weinihaigou.com/brand/queryBrandList.shtml`;
    request(api,function(error,response,body){
        res.send(response.body)
    })

});
//新品
app.get('/api/home/new',function(req,res){
    var page=req.query.page;
    var api=`http://www.weinihaigou.com/solr/searchGoods.shtml?pageNum=${page}&pageSize=20`;
    request(api,function(error,response,body){
        res.send(response.body)
    })

});
//超值量贩
app.get('/api/home/czlf',function(req,res){
    var page=req.query.page;
    var api=`http://www.weinihaigou.com/solr/searchGoods.shtml?pageNum=${page}&pageSize=20`;
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


// 商品详情
app.get('/api/goodList',function(req,res){
    var id=req.query.goodsNo;
    // id='AKN0012';
    var api=`http://www.weinihaigou.com/goods/getDetailMo.shtml?goodsNo=${id}`;
    request(api,function(error,response,body){
        res.send(response.body)
    })

});





http://www.weinihaigou.com/solr/searchGoods.shtml?pageNum=1&pageSize=10





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
    console.log('精选好货以上所有数据的API:  http://localhost:3000/api/home/Top');
    console.log('首页图片点入后的API(需要传入id):  http://localhost:3000/api/home/enterImg');
    console.log('首页限时抢购图片点入后的API:  http://localhost:3000/api/home/timeBuy');
    console.log('首页当季热卖图片点入后的API(需要传入page):  http://localhost:3000/api/home/hotBuy');
    console.log('首页国家馆点入后的API:  http://localhost:3000/api/home/counter');
    console.log('首页品牌街点入后的API:  http://localhost:3000/api/home/ppj');
    console.log('首页新品点入后的API(需要传入page):  http://localhost:3000/api/home/new');
    console.log('首页超值量贩点入后的API(需要传入page):  http://localhost:3000/api/home/czlf');
    console.log('精选好货API:  http://localhost:3000/api/home/goodList');
    console.log('分类左侧API:  http://localhost:3000/api/Fl/FlLeft');
    console.log('分类右侧API:  http://localhost:3000/api/Fl/FlRight');
    console.log('商品详情API(需要传入goodsNo):  http://localhost:3000/api/goodList');
    console.log('发送验证码API:  http://localhost:3000/api/sendAuthCode');
    console.log('登陆验证API:  http://localhost:3000/api/login');
});