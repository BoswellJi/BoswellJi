<template>
  <div>
    <video src="https://oss.kaoyanvip.cn/attach/file1632621484159.mp4"  ref="videoPlayer" class="video-js"></video>
  </div>
</template>

<script>
/**
 * * autoplay，在不同浏览器中实现不同，标准推荐静音之后才可自动播放，没有静音不可自动播放；
 * * autoplay，需要在静音的情况下(muted)，开启声音必须用户手动出发，不可模拟触发；
 */

import videojs from "video.js";
import 'video.js/dist/video-js.css'

export default {
  name: "VideoPlayer",
  props: {
    options: {
      type: Object,
      default() {
        return {
          autoplay: true,
          muted: false
        };
      },
    },
  },
  data() {
    return {
      player: null,
    };
  },
  mounted() {
    this.player = videojs(
      this.$refs.videoPlayer,
      this.options,
      function onPlayerReady() {
        console.log("onPlayerReady", this);
      }
    );
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  },
};
</script>