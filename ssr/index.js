const Vue = require('vue');
const server = require('express')();

const template = require('fs').readFileSync('./index.html', 'utf-8');

const renderer = require('vue-server-renderer').createRenderer({
    template,
});

const context = {
    title: 'vue ssr',
    meta: `
        <meta name="keyword" content="vue,ssr">
        <meta name="description" content="vue srr demo">
    `,
};

server.get('*', (req, res) => {
    const app = new Vue({
        data: {
            url: req.url
        },
        template: `<div>The visited URL is: {{ url }}</div>`,
    });

    renderer
        .renderToString(app, context, (err, html) => {
            console.log(html);
            if (err) {
                res.status(500).end('Internal Server Error')
                return;
            }
            res.end(html);
        });
})

server.listen(8080,()=>{
    console.log('running on 8080 port');
});