<template>
  <div @click="clickhandle">test1</div>
</template>
<script>
// @ts-ignore
export default {
  name:'test1',
  data() {
    return {};
  },
  methods: {
    clickhandle() {
      // @ts-ignore
      this.$emit("test1ClickHandle", "test1ClickHandle");
    },
  },
};
</script>