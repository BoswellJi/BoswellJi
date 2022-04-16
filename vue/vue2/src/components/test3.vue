<template functional>
  <div>
    test3{{context}}
  </div>
</template>

<script>
export default {
  props: {
    msg: String,
  },
  created(){
    console.log(this);
  },
  methods: {},
};
</script>
