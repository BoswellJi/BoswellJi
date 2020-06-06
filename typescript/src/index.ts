import _ from 'lodash';
import args from 'args';
import { parse } from 'cookie';
import { module1, module3, module4, Greeter, GreetingLib } from '../typings/module/module';
import './vue';
import { say, beat } from './javascript';

say('jmz');
beat(1);

_.isArray;

args.command;
args.option;
args.showHelp;
args.a;

parse('df');


// global type definitions file
test('');
test(1);

test1;

test2.say('jmz');
test2.age;
test2.name;


testLib.makeGreeting('string');
testLib.makeGreeting(1);
testLib.name;
new testLib.Test();
testLib;


const module5: test3 = { name: 'df', age: 24 };

// module type definitions file mult
module1('jmz');
module3.a('jmz');
new module4()

const g = new Greeter(<GreetingLib.AlertOptions>{
  modal: true
});
g.greeting;
g.showGreeting();

GreetingLib.say({
  modal: true
});
GreetingLib.options.verbose = true;


// 命名空间中的接口当作类型使用
const options: GreetingLib.AlertOptions = {
  modal: true
};


// single
