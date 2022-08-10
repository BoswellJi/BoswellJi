<template>
  <iframe id="iframeContainer" :src="src" frameborder="0"></iframe>
</template>

<script>
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default {
  data() {
    return {
      src: "",
    };
  },
  mounted() {
    const pdfDocGenerator = pdfMake.createPdf({
      watermark: { text: 'test watermark', color: 'blue', opacity: 0.3, bold: true, italics: false },
    });
    pdfDocGenerator.getDataUrl((dataUrl) => {
      const targetElement = document.querySelector("#iframeContainer");
      targetElement.src = dataUrl;
    });
  },
};
</script>

<style scoped>
#iframeContainer{
  display: block;
  width: 1200px;
  height: 800px;
  margin: 0 auto;
}
</style>
