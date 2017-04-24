const jugglingdb=require('jugglingdb');
const schema=new jugglingdb.Schema('mysql',{
	host: 'localhost',
        port: 3306,
        database: 'city',
        username: 'root',
        user:'jmz', 
        password: 'jmzjmz',
        collation: "utf8_unicode_ci",
        debug: true,
        pool: true,
        connectionLimit: 100
});


var Member=schema.define('Member',{
	name:{type:String,length:50},
	password:{type:String,length:50}
},{
	table:'t_member'
});


module.exports = schema.models.Member;