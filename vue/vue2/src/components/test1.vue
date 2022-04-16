<template>
  <div @click="clickhandle">
    test1{{num}}
    <test3 msg="234"></test3>
    <my-component></my-component>
    <test></test>
  </div>
</template>
<script>

import test3 from './test3.vue';
import Vue from 'vue';
import test from './test.vue';

Vue.component('my-component', {
  functional: true,
  // Props are optional
  props: {
    // ...
  },
  // To compensate for the lack of an instance,
  // we are now provided a 2nd context argument.
  render: function (createElement, context) {
    console.log('test');
    return createElement(
      'div',
       'dfdf',
    )
  }
})

export default {
  name: "test1",
  components:{
    test3,
    test
  },
  created(){
    
  },
  data() {
    return {
      user: {
        name: "Boswell",
      },
      num:0
    };
  },
  methods: {
    clickhandle() {
      this.$emit("test1ClickHandle", "test1ClickHandle");
      this.num++;
    },
  },
};
</script>
