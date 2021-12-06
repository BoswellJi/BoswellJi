<template>
  <div>
    <draggable :list="list1" :group="{ name: 'people' }" :options="{ swap: true }">
    <div>
      df
    </div>
    <div v-for="item of list1" :key="item">
      {{ item }}
    </div>
  </draggable>
  <draggable :list="list2" :group="{ name: 'people' }" :options="{ swap: true }">
    <div>
      df1
    </div>
    <div v-for="item of list2" :key="item">
      {{ item }}
    </div>
  </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  components: {
    draggable,
  },
  data(){
    return {
      list1: [],
      list2:[]
    };
  }
};
</script>

<style></style>
