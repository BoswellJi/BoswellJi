<template>
  <div>
    test4
  </div>
</template>
<script>
export default {
  props:['test4'],
  created(){
    console.log(this.$props,this.$route,4);
  },
};

</script>