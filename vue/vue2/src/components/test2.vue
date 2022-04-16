<template>
  <div @click="increment">
    test2/{{ num }}
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  props:{
    test2: Boolean
  },
  created() {
    console.log(this.$props, this.$route,2);
  },
  computed: {
    num() {
      return this.count;
    },
  },
  data: () => ({
    count: 0,
  }),
  methods: {
    increment() {
      this.count++;
    },
  },
};
</script>
