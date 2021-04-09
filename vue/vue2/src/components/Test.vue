<template>
  <div @click="clickhandle">test</div>
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
      text: "test",
    };
  },
  methods: {
    clickhandle() {
      // @ts-ignore
      this.$emit('testClickHandle','testClickHandle');
    },
  },
};
</script>