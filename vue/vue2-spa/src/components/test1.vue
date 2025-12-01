<template>
  <div @click="clickhandle" class="body">
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
import test from './test';
export default {
  name: "test1",
  components:{
    test
  },
  created(){
    
  },
  data() {
    return {
      dataName:'ttt'
    };
  },
  methods: {
    clickhandle() {
      this.dataName = Math.random()+'';
    },
  },
};
</script>
<style scoped lang="scss">
.body{
  background: red;
}
</style>