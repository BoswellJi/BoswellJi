//引入模块
var mongoose=require('mongoose');

// 定义数据库链接字符串
var url='mongodb://username:password@hostname:port/databasename';
	url='mongodb://localhost/mydb';


mongoose.connect(url);  //链接到数据库服务   

// mongoose中model将mongoDB中的文档与nodejs中的对象建立连接，可以对model中的数据进行操作，
// schema定义mongoDB中的数据模式

// 定义model中的数据结构
var BookSchema=new mongoose.Schema({
	name:String,
	age:Number
});

// 创建model
mongoose.model('Book',BookSchema);
