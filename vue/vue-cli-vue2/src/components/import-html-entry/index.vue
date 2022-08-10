<template>
  <div>import-html-entry</div>
</template>

<script>
import importHTML from "import-html-entry";

export default {
  created() {
    importHTML("http://localhost:7106/").then((res) => {
      console.log(res);
      res.execScripts().then((exports) => {
        console.log(exports, "excescript");
      });
      res.getExternalStyleSheets().then((exports) => {
        console.log(exports, "style");
      });
      res.getExternalScripts().then((exports) => {
        console.log(exports, "script");
      });
    });
  },
};
</script>

<style>
</style>