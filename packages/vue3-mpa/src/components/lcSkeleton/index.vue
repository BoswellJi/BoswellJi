<template>
  <el-skeleton v-for="item of Array(rows)" :key="item" animated :throttle="500">
    <template #template>
      <div class="skeleton">
        <el-skeleton-item variant="image" style="width: 1.3rem; height: 1.3rem" />
        <div class="skeleton-info">
          <el-skeleton-item variant="h3" style="margin-right: 16px" />
          <el-skeleton-item variant="text" style="width: 30%" />
        </div>
      </div>
    </template>
  </el-skeleton>
</template>

<script lang="ts" setup>
defineProps<{
  rows: number;
}>();
</script>
<style scoped lang="scss">
@import './index.scss';
</style>
