<template>
  <div>
    <transition>
      <span :key="style">{{ style }}</span>
    </transition>
    <span @click="style = 1">style1</span>
    <span @click="style = 0">style1</span>
    <span @click="style = 3">style2</span>
    <el-table :data="tableData" style="width: 100%" :row-key="(row) => row.date">
      <el-table-column column-key="3"  prop="date" label="Date" width="180"> </el-table-column>
      <el-table-column column-key="4" key="66" prop="name" label="Name" width="180"> </el-table-column>
       <el-table-column column-key="5" key="45" v-if="style === 0" prop="date" label="Date" width="180"> </el-table-column>
    </el-table>

    <div key="55" v-if="style === 0">11</div>
    <div key="35">22</div>
    <div key="53" v-if="style === 0">33</div>
  </div>
</template>

<script>
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

export default {
  data() {
    return {
      style: 0,
      tableData: [
        {
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-02',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-04',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-01',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
      ],
    };
  },
};
</script>

<style></style>
