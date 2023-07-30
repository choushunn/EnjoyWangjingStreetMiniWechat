function formatTime(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();

  // 格式化时间为指定格式
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':');
}
// 定义格式化数字函数（小于10的数字前面补0）
function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : '0' + n;
}

module.exports = formatTime;