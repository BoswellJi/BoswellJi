<template>
  <section
    class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100"
  >
    <!-- 装饰性心形背景 -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        v-for="i in 15"
        :key="i"
        class="absolute animate-float opacity-10"
        :style="{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${3 + Math.random() * 2}s`,
        }"
      >
        <svg
          :width="30 + Math.random() * 40"
          :height="30 + Math.random() * 40"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="text-pink-400"
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        </svg>
      </div>
    </div>

    <!-- 主要内容 -->
    <div class="relative z-10 text-center px-4 max-w-4xl mx-auto">
      <!-- 主标题 -->
      <div class="mb-8">
        <svg
          class="w-20 h-20 mx-auto mb-6 text-pink-500 animate-pulse-slow"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        </svg>

        <h1 class="text-6xl md:text-7xl font-bold text-pink-600 mb-4">我们的故事</h1>

        <p class="text-xl md:text-2xl text-pink-500 font-light mb-8">记录每一个温暖的瞬间</p>
      </div>

      <!-- 天数计数器 -->
      <div
        class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-pink-200"
      >
        <div class="mb-4">
          <p class="text-gray-600 text-lg mb-2">我们在一起</p>
          <div class="text-6xl md:text-7xl font-bold text-pink-500 mb-2">
            {{ daysTogether }}
          </div>
          <p class="text-gray-600 text-lg">天了</p>
        </div>

        <div class="pt-6 border-t border-pink-200">
          <p class="text-pink-400 text-sm">从 {{ startDateFormatted }} 开始</p>
        </div>
      </div>

      <!-- 装饰性引言 -->
      <div class="mt-12 max-w-2xl mx-auto">
        <p class="text-lg md:text-xl text-gray-700 italic leading-relaxed">
          "在对的时间遇见对的人，是一生幸福；<br class="hidden md:block" />
          在对的时间遇见错的人，是一场心伤；<br class="hidden md:block" />
          而我，遇见了你。"
        </p>
      </div>
    </div>

    <!-- 向下滚动提示 -->
    <!-- <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <svg class="w-8 h-8 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
      </svg>
    </div> -->
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

// 修改这里为你们真正开始的日期
const startDate = new Date('2023-01-01');

const daysTogether = ref(0);

const startDateFormatted = computed(() => {
  return startDate.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
});

const calculateDays = () => {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  daysTogether.value = diffDays;
};

onMounted(() => {
  calculateDays();
  // 每分钟更新一次
  setInterval(calculateDays, 60000);
});
</script>
