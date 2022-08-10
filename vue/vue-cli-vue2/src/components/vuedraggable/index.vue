<template>
  <el-container>
    <el-aside width="200px">
      <draggable :list="list" :group="{ name: 'people',pull:'clone',put:false }" :sort="false" :options="{ swap: true }">
        <div v-for="item of list" :key="item">
          {{ item }}
        </div>
      </draggable>

     =
      <draggable :list="list1" :group="{ name: 'people' }" :sort="false" :options="{ swap: true }">
        <div v-for="item of list1" :key="item">
          {{ item }}
        </div>
        1
      </draggable>
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <test-com></test-com>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import draggable from "vuedraggable";
import testCom from "./child-com1.vue";

export default {
  components: {
    draggable,
    testCom,
  },
  mounted() {},
  data() {
    return {
      list: [111111, 22222222, 333333],
      list1:[]
    };
  },
};
</script>

<style>
div {
  cursor: pointer;
}
</style>
