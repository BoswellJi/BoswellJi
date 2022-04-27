<script setup lang="ts">
import { ref } from "vue";
const model = ref(new Set());
</script>

<template>
  <main>
    <input type="checkbox" value="1" v-model="model" />
  </main>
</template>
