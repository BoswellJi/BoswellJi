// 源对象
const http = {
  makeRequest(ids, callback) {
    // jsonp将数据包裹在callback方法中
    // let url = "https://?callback=" + callback,
    //   script = document.createElement('script');
    // script.src = url;
    // document.body.appendChild(script);
    setTimeout(()=>{
      proxy.handler({
          query:{
            count:10,
            results: {
              Video:[1,2,2]
            }
          }
        }
      );
    },2000);
  }
};

// 代理对象
const proxy = {
  ids: [],
  delay: 50,
  timeout: null,
  callback: null,
  context: null,
  makeRequest(id, callback, context) {
    this.ids.push(id);
    this.callback = callback;
    this.context = context;

    if (!this.timeout) {
      this.timeout = setTimeout(function () {
        proxy.flush();
      }, this.delay);
    }
  },
  flush() {
    http.makeRequest(this.ids, 'proxy.handler');
    this.timeout = null;
    this.ids = [];
  },
  handler(data) {
    let i, max;

    if (parseInt(data.query.count, 10) === 1) {
      proxy.callback.call(proxy.context, data.query.results.Video);
      return;
    }

    for ( i = 0, max = data.query.results.Video.length; i < max; i++) {
      proxy.callback.call(proxy.context, data.query.results.Video[i]);
    }
  }
};

proxy.makeRequest(1, (data) => {
  console.log(data);
});
proxy.makeRequest(1, (data) => {
  console.log(data);
});
proxy.makeRequest(1, (data) => {
  console.log(data);
});