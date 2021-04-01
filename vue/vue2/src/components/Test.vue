<template>
  <div>
    <test1></test1>
  </div>
</template>
<script>
import textMixin from "./text-mixin";
export default {
  name: "test",
  mixins: [textMixin],
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