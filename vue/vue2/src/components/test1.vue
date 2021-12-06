<template>
  <div @click="clickhandle">
    <test :data-name="dataName"></test>
  </div>
</template>
<script>
/**
 * 编译作用域
 * 默认内容
 * 具名插槽
 * 作用域插槽
 */
import test from './Test.vue';
export default {
  name: "test1",
  components:{
    test
  },
  created(){
    
  },
  data() {
    return {
      dataName:''
    };
  },
  methods: {
    clickhandle() {
      this.dataName = Math.random()+'';
    },
  },
};
</script>
