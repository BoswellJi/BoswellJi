<template>
  <div>
    <el-date-picker
      ref="exportDateTime"
      v-model="exportTime"
      type="datetimerange"
      size="small"
      value-format="yyyy-MM-dd HH:mm:ss"
      :default-time="defaultTimeEnd"
      :picker-options="pickerOptions"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    >
    </el-date-picker>
  </div>
</template>

<script>
export default {
  data() {
    return {
      exportTime: [],
      pickerOptions: {
        disabledDate(time) {
          let curDate = new Date().toString(); // 当前时间戳转为字符串
          let curDateYear = new Date().getFullYear(); // 当前时间的年份
          let oneYearAgoDate = curDate.replace(curDateYear, curDateYear - 1); // 字符串年份替换为⼀年前
          let oneYear = new Date(oneYearAgoDate).getTime() - 24 * 60 * 60 * 1000; //⼀年前字符串转为时间戳
          return time.getTime() > Date.now() || time.getTime() < oneYear;
        },
        onPick: this.exportDefaultTimeHandle,
      },
      defaultTimeEnd: ['00:00:00', '23:59:59'],
    };
  },
  methods: {
    exportDefaultTimeHandle(e) {
      const { maxDate } = e;
      if (!maxDate) return;
      const date = new Date(maxDate);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const curDate = new Date();
      const curYear = curDate.getFullYear();
      const curMonth = curDate.getMonth() + 1;
      const curDay = curDate.getDate();
      const picker = this.$refs.exportDateTime.picker;

      setTimeout(() => {
        if (curYear === year && curMonth === month && curDay === day) {
          picker.maxDate = new Date(
            curYear,
            curMonth - 1,
            curDay,
            curDate.getHours(),
            curDate.getMinutes(),
            curDate.getSeconds(),
          );
        } else if (curYear - 1 === year && curMonth === month && curDay === day) {
          picker.minDate = new Date(
            curYear - 1,
            curMonth - 1,
            curDay,
            curDate.getHours(),
            curDate.getMinutes(),
            curDate.getSeconds(),
          );
        } else {
          picker.maxDate = new Date(year, month - 1, day, 23, 59, 59);
        }
      }, 30);
    },
  },
};
</script>

<style>
</style>