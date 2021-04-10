<template>
  <div @click="clickhandle">test{{ text }}</div>
</template>
<script>
// @ts-ignore
export default {
  name: "test",
  components: {},
  props: {
    name: String,
  },
  data() {
    return {
      text: "",
    };
  },
  methods: {
    clickhandle() {
      // @ts-ignore
      this.text = this.text == undefined ? 0 : undefined;
      this.$emit("testClickHandle", "testClickHandle");
    },
  },
};
</script>