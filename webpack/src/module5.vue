<template>
  <div>
    vue3:{{ name }}
    <module6></module6>
    <module7 />
  </div>
</template>

<script lang="ts">
import module6 from './module6.vue';
import module7 from './module7.vue';

export default {
  components: {
    module6,
    module7
  },
  data() {
    return {
      name: 'Vue3'
    };
  }
}
</script>

<style>
</style>
