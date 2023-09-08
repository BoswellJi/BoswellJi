<template>
  <div class="empty">
    <img :src="img" class="img" />
    <div class="text">{{ desc }}</div>
  </div>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    desc?: string;
    img?: string;
  }>(),
  {
    desc: '没有找到符合条件的产品',
    img: '//pic5.40017.cn/i/ori/1b0N4ECCYqk.png',
  },
);
</script>
<style scoped lang="scss">
@import './index.scss';
</style>
