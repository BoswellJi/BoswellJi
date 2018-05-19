const Vue=require('vue');
const server=require('express')();
const renderer=require('vue-server-renderer').createRenderer();

server.get('*',(req,res)=>{
    const vue=new Vue({
        data:{
            url:req.url
        },
        template:'<div>{{url}}</div>'
    });

    renderer.renderToString(vue,(err,html)=>{
        if(err){
            res.status(500).end('Internet server error');
            return;
        }
        res.end(`
            <!DOCTYPE html>
            <html lang="en">
            <head><title>Hello</title></head>
            <body>${html}jmdf</body>
            </html>
        `);
    });
});

server.listen(3000);