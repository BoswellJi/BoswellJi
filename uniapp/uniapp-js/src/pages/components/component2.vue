<template>
  <view class="content">
    <view>
      component2
    </view>
    <slot :user="name"></slot>
    <slot :name="'header'" :title="title"></slot>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: "component2-Hello",
      name: "component2-name",
    };
  },
  methods: {},
};
</script>

<style></style>
