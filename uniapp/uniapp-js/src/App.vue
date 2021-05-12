<script>
import { container ,TYPES} from "./test";
export default {
  onLaunch: function() {
    console.log(container.get(TYPES.Katana));
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  },
};
</script>

<style>
/*每个页面公共css */
</style>
