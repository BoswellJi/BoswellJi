<template>
  <div>
    <!-- 方案1 -->
    <video
      id="video"
      webkit-playsinline="true"
      playsinline="true"
    >
      <source src="https://oss.kaoyanvip.cn/attach/file1632621484159.mp4" type="video/mp4">
    </video>

    <!-- 方案2 -->
    <div id="vs"></div>

    <!-- 方案3 -->
    <iframe src="/video.html"></iframe>

    <!-- 方案4 -->
    <canvas id="canvas"></canvas>
    <div id="videodiv"></div>
  </div>
</template>

<script>
import Player from "xgplayer";

export default {
  mounted() {
    this.fn1();
  },
  destroyed() {
    document.documentElement.removeEventListener("click", this.play);
  },
  methods: {
    fn2() {
      const player = new Player({
        id: "vs",
        url: "https://oss.kaoyanvip.cn/attach/file1632621484159.mp4",
        autoplay: true,
        controls: false,
        volume: 0
      });
    },
    fn1() {
      const video = document.getElementById("video");
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");

      this.video = video;

      // video.muted = true;
      video.volume = 0;
      video.controls = true;
      video.autoplay = true;
      video.preload = "auto";

      console.log(video.volume);

      render();

      function render() {
        window.requestAnimationFrame(render);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height); //绘制视频
      }
    },
  },
};
</script>

<style>
video {
  width: 100%;
}
</style>