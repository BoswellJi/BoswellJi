<template>
  <div>
    <textarea v-model="val" rows="30" cols="30"></textarea>
    <iframe :src="url" style="width:1000px"></iframe>
    <button @click="gen">生成</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      val: "",
      url: "",
    };
  },
  mounted() {},
  methods: {
    gen() {
      fetch("/api/v1/ecs-pdf/", {
        method: "post",
        body: JSON.stringify({
          html: this.val
        }),
        headers:{
          'content-type':'application/json'
        }
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
          const {
            data: { pdf },
          } = res;
           this.url = pdf;
        });
    },
  },
};
</script>

<style></style>
