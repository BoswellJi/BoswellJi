// //加载事件模块，获取事件触发器
// var EventEmitter=require("events").EventEmitter;

// //实例化一个事件触发器
// var life=new EventEmitter();


// //给事件触发器绑定一个自定义事件
// life.on('a',function(who){
// 	console.log('我爱'+who);
// })

// //可以绑定多个
// life.on('a',function(who){
// 	console.log('爱'+who);
// })

// //触发事件
// life.emit('a','jmz');
// life.emit('a','jay');


// //查看事件触发器绑定的摸个事件的个数
// console.log(life.listeners('a').length);
// console.log(EventEmitter.listenerCount(life,'a'));
var event=require('events');
// console.log(event);
// var emitter=new event.EventEmitter();
class MyEmitter extends event{

}

const myEmitter=new MyEmitter();
myEmitter.on('event',()=>{
	console.log('事件');
});

myEmitter.emit('event');
