var fs=require('fs');
fs.readFile('./.tasks',function(err,data){
    console.log(err);
    console.log(data.toString());
});