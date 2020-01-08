/**
 * @param {number}  n 页码 1开始
 * @param {number}  s 尺码
 * @param {number}  t
 * @return {number} 当前页的第一条数据的索引
 */
function pageFirstItemIndex(n, s) {
    return --n * s;
}


/**
 * 获取月份的第一天星期几
 * @param {number} year 年份
 * @param {number} mon 月份
 */
function monthFirstWeek(year, mon) {
    const date = new Date(year, mon-1, 1);
    return date.getDay();
}
