/**
 * 设计的新接口与老接口不能兼容时候，需要进行适配，让老接口变为新接口，同时省去大规模修改老接口
 */

const clientObject = {
  name: '',
  age: 0,
  sex: true
};

function client(name, age, sex) { }

/**
 * 将clientObject对象怎样传到client中
 * 使用适配器模式进行适配
 * adaptorFn对client函数进行包装
 */
function adaptorFn(o) {
  client(o.name, o.age, o.sex);
}

adaptorFn(o);

/**
 * 两个库之间的适配
 * 接口的替换 之前用的 $ 函数，替换为 YAHOO.util.Dom.get 函数，
 */

function $() { }

YAHOO.util.Dom.get = function (el) { }

// YAHOO.util.Dom 适配 $函数接口
function PrototypeToYUIAdaptor() {
  return YAHOO.util.Dom.get(arguments);
}

// $ 适配 YAHOO 库接口
function YUIToPrototypeAdaptor(el) {
  return $.apply(window, el instanceof Array ? el : [el]);
}

$ = PrototypeToYUIAdaptor;
YAHOO.util.Dom.get = YUIToPrototypeAdaptor;