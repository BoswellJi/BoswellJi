<template>
  <view class="content">
    <view>
      component1
    </view>
    <slot :user="name"></slot>
    <slot :name="'header'" :title="title"></slot>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: "Hello",
      name: "df",
    };
  },
  methods: {},
};
</script>

<style></style>
