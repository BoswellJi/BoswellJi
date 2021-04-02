<template>
  <div>
    <test1></test1>
    <c1></c1>
  </div>
</template>
<script>
import textMixin,{c1} from "./text-mixin";
export default {
  name: "test",
  mixins: [textMixin],
  components:{
    c1
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
      this.text = "test1";
    },
  },
};
</script>