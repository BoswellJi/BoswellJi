<template>
  <div @click="clickhandle">test{{ dataName }}dfdf</div>
</template>
<script>
export default {
  name: "test",
  components: {},
  props: {
    dataName: String,
  },
  mounted(){
    console.log('mounted');
  },
  data() {
    return {
      text: "",
    };
  },
  methods: {
    clickhandle() {
      this.text = this.text == undefined ? 0 : undefined;
    },
  },
};
</script>