<template>
  <div>
     <video
      class="js-video"
      id="video"
      controls
      muted
      webkit-playsinline="true"
      playsinline="true"
      autoplay="true"
      preload="auto"
      src="https://oss.kaoyanvip.cn/attach/file1632621484159.mp4"
    ></video>  
    <canvas id="js-canvas"></canvas>
    <div id="videodiv"></div>
  </div>
</template>

<script>
import { CanvasVideoPlayer } from "../lib/canvas-video-player";

export default {
  mounted() {
    // var canvasVideo = new CanvasVideoPlayer({
    //   videoSelector: ".js-video",
    //   canvasSelector: ".js-canvas",
    // });
    // canvasVideo.play();

    const video = document.getElementById('video');
    const canvas = document.getElementById("js-canvas");
    const ctx = canvas.getContext("2d");

    render();
    
    function render() {
      window.requestAnimationFrame(render);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height); //绘制视频
    }
  },
};
</script>

<style>
#js-canvas {
  position: absolute;
  z-index: 12;
  left:1px;
}

video{
  width: 100%;
}
</style>