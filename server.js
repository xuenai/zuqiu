var express = require('express'),
	bodyParser = require('body-parser'),//用于post方式的
	MongoClient = require('mongodb').MongoClient;


var DB_CONN_STR = 'mongodb://127.0.0.1:27017/zuqiu';
var app = express();

var selectData = function(db, callback,where) {  
	//连接到表  
	var collection = db.collection('user');
	//查询数据
	var whereStr = where;
	collection.find(whereStr).toArray(function(err, result) {
	if(err)
	{
	console.log('Error:'+ err);
	return;
	}     
	callback(result);
});
}

var insertData = function(db, callback,data) {  
    //连接到表 site
    var collection = db.collection('user');
    //插入数据
    collection.insert(data, function(err, result) { 
        if(err)
        {
            console.log('Error:'+ err);
            return;
        }     
        callback(result);
    });
}
 

app.use(express.static('static'));
app.use(bodyParser.urlencoded({
	extended:true
}));

//注册
app.post('/api/register',function(req,res){
	MongoClient.connect(DB_CONN_STR, function(err, db) {
	  console.log("连接成功！");
	  var msg = {};
	  selectData(db, function(result) {
	    if(result.length == 0){
	    	console.log(result);
	    	msg.tel = true;
	    }else{
	    	msg.tel = false;
	    }
	  },{'tel':req.body.tel});
	  selectData(db, function(result) {
	    if(result.length == 0){
	    	console.log(result);
	    	msg.nickname = true;
	    }else{
	    	msg.nickname = false;
	    }

	    if(msg.tel && msg.nickname){
	    	//写入数据库
	    	MongoClient.connect(DB_CONN_STR, function(err, db) {
			    console.log("连接成功！");
			    insertData(db, function(result) {
			        console.log(result);
			        db.close();
			    },[req.body]);
			});
	    }
	    res.json(msg);

	    db.close();
	  },{'nickname':req.body.nickname});
	});
});

//登录
app.post('/api/login',function(req,res){
	MongoClient.connect(DB_CONN_STR, function(err, db) {
	  console.log("连接成功！");
	  selectData(db, function(result) {
	    if(result.length == 0){
	    	res.json({code:0,msg:'用户名或密码错误'});
	    }else{
	    	res.json({code:1,msg:'ok'});
	    };
	    db.close();
	  },req.body);
	});
});


console.log('服务器正常开启');
app.listen(8090);

