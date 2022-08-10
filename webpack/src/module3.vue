<template>
  <div>
    <router-view></router-view>
    <button @click="setState">{{ name }} {{num}}</button>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import add,{ esmAdd, num } from './esm';

  const name = ref('hhh');

  function setState() {
    // esmAdd();
    add();
    console.log(num);
  }
</script>
