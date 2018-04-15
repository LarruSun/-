var express = require('express');
var app = express();
var request = require("request");
//解决跨域的问题
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

var homeApi = 'https://mrobot.pconline.com.cn/s-300/best/cms/listHomepagev2.xsp?pageSize=20&sectionId=';
app.get('/api/home',function(req,res){
    console.log('s')
    //在后台请求的api
    /*
        request: 请求体
        res: response 响应体
        request(url,function(error,response,body){
    
        });
    */
    // res.send("将这个内容放到前段页面显示");
    //homeApi+req.query.sectionId+'&pageNo='+req.query.pageNo 你抓取到的api接口
    request(homeApi+req.query.sectionId+'&pageNo='+req.query.pageNo,function(error,response,body){
        res.send(response.body);
    })
})
app.get('/api/stations',function(req,res){
    
})
app.get('/api/listFocus',function(req,res){
    //在后台请求的api
    request('https://mrobot.pconline.com.cn/s-300/best/cms/listFocus.xsp?inReview=0&platform=ios&v=3.2.0',function(error,response,body){    
        var responseJSON = JSON.parse(response.body);
        res.send(responseJSON);
    })
})
app.get('/api/detail',function(req,res){
	//在后台请求的api
	request('https://mrobot.pconline.com.cn/s-1800/best/cms/topicDetailv2.xsp?topicId='+req.query.topicId+'&fontSize=15&hd=1&platform=iOS&v=3.1.1&resVer=30001&inReview=0&isWifi=1',function(error,response,body){
        res.send(responseJSON);
	})
})

 
app.get('/api/search',function(req,res){
    request('https://mrobot.pconline.com.cn/s-3600/best/search/classfyIndex.xsp?type=1&platform=ios&v=3.1.1&inReview=0',function(error,response,body){
        res.send(response.body);
    })
})

app.get('/api/partList',function(req,res){
    var url = "http://106.75.21.53/comic_v2/partlistbybook_v5";
    var header = {
        "bookid":"205031",
        "apptype":"6",
        "channel":"Mk360",
        "appversion":"2.0.20",
        "projectid":2,
        "platformid":1,
        "appid":6,
        "token": "8324478979e8fee584047aa7d31657bc"
    }
	request({
		url: url,
		methods: "POST",
		headers: header
	},function(error,response,body){
        console.log("post请求");
		 console.log(response.body);
	})
})
var recommandAPI = 'https://mrobot.pconline.com.cn/s-300/best/search/listTopicSearch.xsp?searchCondition=';
// app.get('/api/recommand',function(req,res){
//     var ap = recommandAPI+req.query.searchCondition+'&sectionId=0&searchType=3&pageNo=1&pageSize=20&platform=ios&v=3.1.3&inReview=0';
//     // console.log(ap);
//     // res.send(ap);
//     request(ap,function(error,response,body){
//         console.log(response.body);
//     })
// })

var server = app.listen(3000,function(){
	var local = "http://localhost:3000/api/home?sectionId="
	console.log(`在浏览器中输入:${local}`);
	console.log(`精选页面数据: ${local}99`);
	console.log(`优惠页面数据: ${local}0`);
	console.log(`海涛页面数据:  ${local}1`);
	console.log(`发现页面数据:  ${local}2`);
	console.log(`原创页面数据:  ${local}34`);

})