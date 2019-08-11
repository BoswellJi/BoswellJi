var fs=require('fs');

var rs=fs.createReadStream('./1.txt',{
    number:11,
    encoding:'utf-8'
});

var data='';

rs.on('data',function(chunk){
    data+=chunk+'jmz';
});

rs.on('end',function(){
    console.log(data);
});