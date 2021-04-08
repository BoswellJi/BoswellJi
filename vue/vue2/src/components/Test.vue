<template>
  <div>
    <test1></test1>
    
  </div>
</template>
<script>
// @ts-ignore
import textMixin,{c1} from "./text-mixin";
export default {
  name: "test",
  mixins: [textMixin],
  components:{
   
  },
  props: {
    name: String,
  },
  beforeUpdate() {
    console.log("test before update");
  },
  updated() {
    console.log("test updated");
  },
  data() {
    return {
      text: "test",
    };
  },
  methods: {
    clickhandle() {
      // @ts-ignore
      this.text = "test1";
    },
  },
};
</script>