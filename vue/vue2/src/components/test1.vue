<template>
  <div @click="clickhandle">
    test1
  </div>
</template>
<script>
/**
 * 编译作用域
 * 默认内容
 * 具名插槽
 * 作用域插槽
 */
export default {
  name: "test1",
  created(){
    
  },
  data() {
    return {
      user: {
        name: "Boswell",
      },
    };
  },
  methods: {
    clickhandle() {
      this.$emit("test1ClickHandle", "test1ClickHandle");
    },
  },
};
</script>
