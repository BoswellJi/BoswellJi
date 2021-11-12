<template>
  <div>
    <van-nav-bar left-arrow right-text="答题卡">
      <template #title>
        <van-count-down
          ref="selfcountDown"
          :time="countDowm"
          :auto-start="false"
          @finish="countDowmFinish"
          @change="countDownChange"
        />
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
import Vue from "vue";
import vant from "vant";
import "vant/lib/index.css";
Vue.use(vant);

export default {
  data() {
    return {
      countDowm: 10000,
    };
  },
  mounted() {
    this.$refs.selfcountDown.start();
  },
  methods: {
    countDowmFinish() {
      console.log("finish");
    },
    countDownChange(e) {
      console.log(e);
    },
  },
};
</script>

<style>
</style>