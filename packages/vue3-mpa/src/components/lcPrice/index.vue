<template>
  <div class="money">
    <template v-if="price">
      &yen;
      <div class="symbol">{{ price }}</div>
      起
    </template>
    <template v-else> 实时计价 </template>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  price: number;
}>();
</script>
<style scoped lang="scss">
@import './index.scss';
</style>
