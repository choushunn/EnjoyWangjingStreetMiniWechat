// pages/community/appointment/equipment/equipment.js
const app = getApp();
var now = new Date();
// 格式化时间
var year = now.getFullYear();
var month = now.getMonth() + 1;
var day = now.getDate();
var hour = now.getHours();
var minute = now.getMinutes();
var second = now.getSeconds();
// 将时间格式化为字符串
var timeStr = hour + ':' + minute;
var dateStr = year + '-' + month + '-' + day;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: timeStr,
    date: dateStr,
  },
  TimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  onSubmit: function (event) {
    const formData = event.detail.value;
    const extraData = {
      user: 1
    }; // 新字段
    const data = Object.assign({}, formData, extraData); // 合并表单数据和新字段
    console.log(data); // 打印表单数据对象
    // todo:需要校验表单数据
    // 使用 wx.request 发送数据到后端API
    wx.request({
      url: app.globalData.apiUri + 'appointment/',
      method: 'POST',
      data: data,
      success: function (res) {
        console.log(res); // 打印后端API返回的数据
        // 处理成功提示信息
        if (res.statusCode == 201) {
          wx.showToast({
            title: '提交成功，请到个人中心查看详情',
          })
        } else {
          wx.showToast({
            title: '提交失败',
          })
        }
      },
      fail: function (res) {
        console.log(res.errMsg); // 打印错误信息
        // 处理失败提示信息
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取可用的预约事项
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})