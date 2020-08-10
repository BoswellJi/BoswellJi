<template>
  <div class="hello">
    
  </div>
</template>

<script>
import test from "./Test";
import test1 from "./test1";
export default {
  name: "HelloWorld",
  components: {
    test,
    test1
  },
  props: {
    msg: String
  },
  // watch: {
  //   name() {}
  // },
  data() {
    return {
      name: "Hello world",
      age: 12,
      show: true
    };
  },
  created() {
    // console.log(this.$forceUpdate);
    console.log("HelloWorld", this);

    // this.$nextTick(function() {
    //   console.log(this.age);
    // });
    // this.$nextTick(function() {
    //   console.log(this.age);
    // });
    // this.$nextTick(function() {
    //   console.log(this.age);
    // });
    // this.$nextTick(function() {
    //   console.log(this.age);
    // });
  },
  mounted() {
    // this.$watch(
    //   ()=>{
    //     return 'a+b'
    //   },
    //   (newVal, oldVal) => {
    //     console.log(newVal, oldVal);
    //   },
    //   {
    //     immediate: true,
    //     lazy: true,
    //   }
    // );
  },
  methods: {
    updateText() {
      this.age = 1223;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
