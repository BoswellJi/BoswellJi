<template>
  <div @click="increment">
    test2
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Button",
  computed:{
    num(){
      return this.count
    }
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
