// pages/community/appointment/playroom/playroom.js
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
    startTime: "09:00",
    endTime: "17:00",
    picker: ['事项1', '事项2', '事项3'],
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
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },  
  onSubmit: function (event) {
    const formData = event.detail.value;
    const extraData = {
      user: 1
    }; // 新字段
    const data = Object.assign({}, formData, extraData); // 合并表单数据和新字段
    console.log(data); // 打印表单数据对象
    // 使用 wx.request 发送数据到后端API
    wx.request({
      url: app.globalData.apiUri + 'api/v1/community/appointment/',
      method: 'POST',
      data: data,
      success: function (res) {
        console.log(res); // 打印后端API返回的数据
        // 处理成功提示信息
        if (res.statusCode == 200) {
          wx.showToast({
            title: '提交成功',
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
  StartTimeChange: function(e) {
    const startTime = new Date('1970/01/01 ' + e.detail.value).getTime(); // 将选择的开始时间转换为时间戳
    const endTime = new Date('1970/01/01 ' + this.data.endTime).getTime(); // 将选择的结束时间转换为时间戳
    if (startTime >= endTime) {
      // 如果选择的开始时间晚于或等于结束时间，则弹出提示
      wx.showToast({
        title: '开始时间需早于结束时间',
        icon: 'none'
      });
      // 将选择的时间重置为原来的值
      this.setData({
        startTime: this.data.startTime
      });
    } else if (startTime < new Date('1970/01/01 09:00').getTime()) {
      // 如果选择的开始时间早于9:00，则弹出提示
      wx.showToast({
        title: '开始时间需在9:00之后',
        icon: 'none'
      });
      // 将选择的时间重置为9:00
      this.setData({
        startTime: '09:00'
      });
    } else {
      // 显示当前选择的开始时间
      wx.showToast({
        title: '开始时间为 ' + e.detail.value,
        icon: 'none'
      });
      this.setData({
        startTime: e.detail.value
      });
    }
  },
  EndTimeChange: function(e) {
    const startTime = new Date('1970/01/01 ' + this.data.startTime).getTime(); // 将选择的开始时间转换为时间戳
    const endTime = new Date('1970/01/01 ' + e.detail.value).getTime(); // 将选择的结束时间转换为时间戳
    if (endTime <= startTime) {
      // 如果选择的结束时间早于或等于开始时间，则弹出提示
      wx.showToast({
        title: '结束时间需晚于开始时间',
        icon: 'none'
      });
      // 将选择的时间重置为原来的值
      this.setData({
        endTime: this.data.endTime
      });
    } else if (endTime > new Date('1970/01/01 17:00').getTime()) {
      // 如果选择的结束时间晚于17:00，则弹出提示
      wx.showToast({
        title: '结束时间需在17:00之前',
        icon: 'none'
      });
      // 将选择的时间重置为17:00
      this.setData({
        endTime: '17:00'
      });
    } else {
      // 显示当前选择的结束时间
      wx.showToast({
        title: '结束时间为 ' + e.detail.value,
        icon: 'none'
      });
      this.setData({
        endTime: e.detail.value
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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