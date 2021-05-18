<template>
  <view class="content">
    <view>
      component1
    </view>
    <slot title="default"></slot>
    <slot name="header" title="title"></slot>
    <slot name="body" title="body"></slot>
  </view>
</template>

<script>
export default {
  inject: ["foo"],
  created() {
    console.log(this.foo, "Page");
  },
  data() {
    return {
      title: "component1-Hello",
      name: "component1-name",
    };
  },
  methods: {},
};
</script>

<style></style>
