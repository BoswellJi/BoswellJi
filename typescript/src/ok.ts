import { ok, name, age } from 'ok';
import MyFun, { name as n } from '../typings/module/module-function';
import Vue from 'vue';

ok.say;
age;

const a: MyFun.type = {};
MyFun(1);

new MyFun();
n;

(1).a();

