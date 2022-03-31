<template>
  <div>
    <router-view></router-view>
    {{ name }}
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  const name = ref('hhh');
</script>
