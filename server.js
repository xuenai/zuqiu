var express = require('express'),
	bodyParser = require('body-parser'),//用于post方式的
	MongoClient = require('mongodb').MongoClient;


var DB_CONN_STR = 'mongodb://127.0.0.1:27017/zuqiu';
var app = express();

var selectData = function(db, callback,where,site) {  
	//连接到表  
	var collection = db.collection(site);
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

var insertData = function(db, callback,data,site) {  
    //连接到表 site
    var collection = db.collection(site);
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


var delData = function(db, callback,where,site) {  
  //连接到表  
  var collection = db.collection(site);
  //删除数据
  collection.remove(where, function(err, result) {
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

//发现搜索请求
app.get('/api/faxian',function(req,res){
	MongoClient.connect(DB_CONN_STR, function(err, db) {
	  console.log("连接成功！");
	  selectData(db, function(result) {
	    if(result.length == 0){
	    	res.json({code:0,msg:'没有此用户'});
	    }else{
	    	res.json({code:1,msg:'ok',data:result});
	    };
	    db.close();
	  },req.query,'guanzhu');
	});
})

//保存关注数据
app.post('/api/guanzhu',function(req,res){
	MongoClient.connect(DB_CONN_STR, function(err, db) {
	  console.log("连接成功！");
	  insertData(db, function(result) {
	  		res.json({code:1});
	        db.close();
	    },[req.body],'yiguanzhu');
	});
})

//查询保存的关注
app.get('/api/yiguanzhu',function(req,res){
	MongoClient.connect(DB_CONN_STR, function(err, db) {
	  console.log("连接成功！");
	  selectData(db, function(result) {
	    if(result.length == 0){
	    	res.json({code:0,msg:'没有相关数据'});
	    }else{
	    	res.json({code:1,msg:'ok',data:result});
	    };
	    db.close();
	  },{},'yiguanzhu');
	});
})

//取消关注
app.post('/api/quxiao',function(req,res){
	MongoClient.connect(DB_CONN_STR, function(err, db) {
	  console.log("连接成功！");
	  delData(db, function(result) {
	  	if(result.result.ok == 1){
	  		res.json({code:1});
	  	};
	    db.close();
	  },req.body,'yiguanzhu');
	});
});


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
	  },{'tel':req.body.tel},'user');
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
			    },[req.body],'user');
			});
	    }
	    res.json(msg);

	    db.close();
	  },{'nickname':req.body.nickname},'user');
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
	    	res.json({code:1,msg:'ok',data:result});
	    };
	    db.close();
	  },req.body,'user');
	});
});


console.log('服务器正常开启');
app.listen(8090);

