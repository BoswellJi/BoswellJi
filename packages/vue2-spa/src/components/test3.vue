<template>
  <div>
    test3
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  props: {
    msg: String,
    test3: Boolean
  },
  created(){
    console.log(this.$props,this.$route,3);
  },
  data: () => ({
    count: 0,
  }),
  methods: {

  },
};
</script>
