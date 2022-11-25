<template>
  <div class="wrapper">
    <div id="canvas">
      hhhh
    </div>
    <div id="img">
    </div>  
  </div>
</template>

<script>
import html2canvas from "html2canvas";
export default {
  mounted() {
    html2canvas(document.getElementById('canvas')).then(function (canvas) {
      document.getElementById('img').appendChild(canvas);
    });
  },
};
</script>

<style>
</style>