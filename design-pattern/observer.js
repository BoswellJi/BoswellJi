/**
 * 观察者模式(发布者-订阅者 模式)
 * 元素: 观察者和被观察者  (发布者和订阅者)
 * 
 * 订阅者获取信息的方式:
 * 1. 推: 由发布者进行传递
 * 2. 拉: 由订阅者自行拉取
 */
const observer = (() => {
    let message = {};
    return {
        /**
        * @param {string} type 任务类型
        * @param {Function} fn 任务执行回调
        */
        on(type, fn) {
            if (typeof message[type] === 'undefined') {
                message[type] = [fn];
            } else {
                message[type].push(fn);
            }
        },
        /**
         * @param {string} type 任务类型
         * @param {Function} fn 任务执行回调
         */
        off(type, fn) {
            if (message[type] instanceof Array) {
                let i = message[type].length - 1;
                for (; i >= 0; i--) {
                    message[type][i] === fn && message[type].splice(i, 1);
                }
            }
        },
        /**
         * 出发订阅事件
         * @param {string} type 任务类型
         * @param {Object} args 参数
         */
        subscribe(type, args) {
            if (!message[type]) {
                return;
            }

            let events = {
                type: type,
                args: args || {}
            },
                i = 0,
                len = message[type].length;
            for (; len > i; i++) {
                message[type][i](events);
            }
        }
    }
})();

observer.on('say', (data) => {
    console.log(data.args.text);
});

observer.subscribe('say', {
    text: 'hellow'
});



//  实现vue 数据双向绑定
class MyVue {
    constructor(options) {
        this.options = options;
        this.el = document.querySelector(options.el);
        this.data = options.data;

        // 消息队列
        this.directives = {};
        // 现创建响应式系统
        this.observer(this.data);
        this.complie(this.el);
    }

    /**
     * 观察者，观察数据变更
     * 1. 给每一个键（消息），设置对应的任务队列
     * 2. 重新定义属性检测
     * @param {*} data
     * @returns
     * @memberof MyVue
     */
    observer(data) {
        let val;
        for (let key in data) {
            // 是否又自身属性
            if (data.hasOwnProperty(key)) {
                this.directives[key] = [];
            }

            // 如果属性值仍为Object,进行递归
            val = data[key];

            if (typeof val === 'object') {
                this.observer(val)
            }

            let dir = this.directives[key];

            Object.defineProperty(data, key, {
                configurable: true,
                enumerable: true,
                get() {
                    return val;
                },
                set(newVal) {
                    if (val !== newVal) {
                        val = newVal;
                        dir.forEach((el, index) => {
                            el.update();
                        });
                    }
                }
            });
        }
    }

    /**
     * 解析html
     * 1. 将对应的指令（消息，键） 添加任务监听
     * 2. 给ui绑定事件，触发后更新数据
     *
     * @param {*} el
     * @memberof MyVue
     */
    complie(el) {
        // 获取节点子元素
        let nodes = el.children;

        for (let i = 0; i < nodes.length; i++) {
            let node = nodes[i];

            if (node.children.length) {
                this.complie(node);
            }

            if (node.hasAttribute('v-text')) {
                let vText = node.getAttribute('v-text');
                // 将指令操作添加到对应的队列
                this.directives[vText].push(new Watcher('text', node, this, vText, 'innerHTML'));
            }

            if (node.hasAttribute('v-model') && (node.tagName.toLowerCase() === 'input' || node.tagName.toLowerCase() === 'textarea')) {
                node.addEventListener('input', (() => {
                    let attribute = node.getAttribute('v-model');
                    this.directives[attribute].push(new Watcher('model', node, this, attribute, 'value'));

                    return () => {
                        this.data[attribute] = node.value;
                    }
                })());
            }
        }
    }
}

class Watcher {
    constructor(name, el, vm, exp, attr) {
        this.name = name;
        this.el = el;
        this.vm = vm;
        this.exp = exp;
        this.attr = attr;

        //更新操作
        this.update();
    }

    update() {
        this.el[this.attr] = this.vm.data[this.exp]
    }
}

// 可观察构造函数 Observable
function Observable() { }

Observable.prototype = {
    subscriberCustomer(subscriber) { },
    unSubscriberCustomer(subscriber) { },
    deliver(news) { }
};

function Subscriber(news) { }

// addEventListener 添加事件监听器

const divObj = document.createElement('div');
// 注册对divObj对象的click事件的监听器
divObj.addEventListener('click', function () { }, false);
divObj.addEventListener('click', function () { }, false);
divObj.addEventListener('click', function () { }, false);