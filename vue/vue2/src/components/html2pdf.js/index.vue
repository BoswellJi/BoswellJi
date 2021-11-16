<template>
  <div id="temp">
    template
    <van-pagination v-model="currentPage" :total-items="24" :items-per-page="5" />
    <a href="https://www.baidu.com">badu</a>
    <img src="/favicon.ico" alt="">
  </div>
</template>

<script>
import html2pdf from "html2pdf.js";
import Vue from "vue";
import vant from "vant";
import "vant/lib/index.css";
Vue.use(vant);

export default {
  data() {
    return {
      currentPage: 1,
    };
  },
  mounted() {
    var element = document.getElementById("temp");
    html2pdf(element).toPdf(()=>{
      console.log(arguments);
    })
  },
};
</script>

<style>
</style>