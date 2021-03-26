<script>
export default {
  name: "test",
  props: {
    name: String,
  },
  beforeUpdate() {
    console.log("test before update");
  },
  updated() {
    console.log("test updated");
  },
  data() {
    return {
      text: "test",
    };
  },
  methods: {
    clickhandle() {
      this.text = "test1";
    },
  },
  render(h) {
    return (
      <div on-click={this.clickhandle}>
        {this.text} {this.name}
      </div>
    );
  },
};
</script>