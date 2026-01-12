<template>
  <section class="py-20 px-4 bg-gradient-to-b from-pink-50 to-white">
    <div class="max-w-4xl mx-auto">
      <!-- 标题 -->
      <div class="text-center mb-16">
        <h2 class="text-5xl font-bold text-pink-600 mb-4">我们的时光</h2>
        <p class="text-xl text-gray-600">每一个瞬间都值得被记录</p>
      </div>

      <!-- 时间轴 -->
      <div class="relative">
        <!-- 中间的线 (桌面端) -->
        <div
          class="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-pink-300 via-pink-400 to-pink-300 rounded-full hidden md:block"
        ></div>

        <!-- 移动端的线 -->
        <div
          class="absolute left-8 w-0.5 h-full bg-gradient-to-b from-pink-300 via-pink-400 to-pink-300 md:hidden"
        ></div>

        <!-- 时间轴事件 -->
        <div class="space-y-12">
          <div v-for="(event, index) in timelineEvents" :key="index" class="relative">
            <!-- 桌面端布局 -->
            <div
              class="hidden md:flex items-center"
              :class="index % 2 === 0 ? 'flex-row-reverse' : ''"
            >
              <!-- 内容卡片 -->
              <div class="w-5/12" :class="index % 2 === 0 ? 'text-right' : 'text-left'">
                <div
                  class="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border-2 border-pink-100"
                  :class="index % 2 === 0 ? 'mr-8' : 'ml-8'"
                >
                  <div class="mb-3">
                    <span
                      class="inline-block px-4 py-1 bg-pink-100 text-pink-600 rounded-full text-sm font-medium"
                    >
                      {{ event.date }}
                    </span>
                  </div>
                  <h3 class="text-2xl font-bold text-gray-800 mb-3">{{ event.title }}</h3>
                  <p class="text-gray-600 leading-relaxed">{{ event.description }}</p>

                  <!-- 图标 -->
                  <div class="mt-4" :class="index % 2 === 0 ? 'text-right' : 'text-left'">
                    <span class="text-4xl">{{ event.icon }}</span>
                  </div>
                </div>
              </div>

              <!-- 中间的点 -->
              <div
                class="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-pink-500 border-4 border-white rounded-full shadow-lg z-10"
              ></div>
            </div>

            <!-- 移动端布局 -->
            <div class="md:hidden flex items-start gap-6">
              <!-- 左侧的点 -->
              <div class="flex-shrink-0">
                <div
                  class="w-4 h-4 bg-pink-500 border-4 border-white rounded-full shadow-lg relative left-[1.4rem]"
                ></div>
              </div>

              <!-- 内容卡片 -->
              <div class="flex-1">
                <div
                  class="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border-2 border-pink-100"
                >
                  <div class="mb-3">
                    <span
                      class="inline-block px-4 py-1 bg-pink-100 text-pink-600 rounded-full text-sm font-medium"
                    >
                      {{ event.date }}
                    </span>
                  </div>
                  <h3 class="text-xl font-bold text-gray-800 mb-3">{{ event.title }}</h3>
                  <p class="text-gray-600 leading-relaxed">{{ event.description }}</p>
                  <div class="mt-4">
                    <span class="text-3xl">{{ event.icon }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 结尾 -->
      <div class="text-center mt-20">
        <div
          class="inline-block bg-gradient-to-r from-pink-400 to-rose-400 text-white px-8 py-4 rounded-full shadow-lg"
        >
          <p class="text-lg font-medium">未完待续... 💕</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// 在这里添加你们的故事，可以随意修改
const timelineEvents = [
  {
    date: '2025年5月24日',
    title: '第一次相遇',
    description: '那天阳光正好，我遇见了你。从此，我的世界多了一抹色彩。',
    icon: '✨',
  },
  {
    date: '2025年5月31日',
    title: '第一次约会',
    description: '我们一起去了西餐厅，看金鸡湖音乐喷泉，度过了一个难忘的夜晚。',
    icon: '💐',
  },
  {
    date: '2025年10月1日',
    title: '第一次旅行',
    description: '我们一起去了杭州，留下了无数美好的回忆。',
    icon: '💕',
  },
  {
    date: '2025年12月10日',
    title: '第一次亲亲',
    description: '在那个浪漫的夜晚，我们的唇第一次相遇，心跳加速，甜蜜无比。',
    icon: '🌅',
  },
  {
    date: '2025年12月31日',
    title: '第一次跨年',
    description: '我们一起迎接了新的一年，许下了共同的愿望。',
    icon: '🎁',
  },
  {
    date: '2026年1月10日',
    title: '第一次看房',
    description: '我们一起看了第一套房子，梦想着未来的家。',
    icon: '💑',
  },
];
</script>
