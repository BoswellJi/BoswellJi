import Vue from 'vue';

// 模块化插件，主要用来处理，插件对模块的修改
declare module 'vue/types/options' {
  type c = () => string;
  function b(): number;
}