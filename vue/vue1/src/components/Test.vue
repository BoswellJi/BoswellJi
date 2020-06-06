<template>
  <div v-if="a" @click="test">test
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "test",
  props:{
    a: Boolean
  },
  methods: {
    test() {
      // this.$parent.name = 'df';
      this.$parent.show = false;
    }
  }
};
</script>