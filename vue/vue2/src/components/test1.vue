<template>
  <div @click="test">test1</div>
</template>
<script>
export default {
  name: "test1",
  methods: {
    test() {
      this.$parent.show = false;
    }
  }
};
</script>