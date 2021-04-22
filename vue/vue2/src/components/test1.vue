<template>
  <div @click="clickhandle">
    <slot :user="user" :person="user"> This is default content; </slot>
    <slot name="header"></slot>
  </div>
</template>
<script>
/**
 * 编译作用域
 * 默认内容
 * 具名插槽
 * 作用域插槽
 */
// @ts-ignore
export default {
  name: "test1",
  created(){
    console.log(this);
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
      // @ts-ignore
      this.$emit("test1ClickHandle", "test1ClickHandle");
    },
  },
};
</script>
