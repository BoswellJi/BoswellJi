<template>
  <button @click="increment">点击计数：{{ count }}</button>
</template>
<script setup lang="ts">
// 可以直接在幻灯片中运行 JavaScript 代码
const greeting = 'Hello, Slidev!'
console.log(greeting)

// 使用 Vue 响应式数据
import { ref } from 'vue'
const count = ref(0)
const increment = () => count.value++
</script>
