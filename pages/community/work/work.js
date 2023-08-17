// pages/community/repair/repair.js
const app = getApp();
var now = new Date();
// 格式化时间
var year = now.getFullYear();
var month = now.getMonth() + 1;
var day = now.getDate();
var hour = now.getHours();
var minute = now.getMinutes();
var second = now.getSeconds();
// 将时间格式化为字符串
var timeStr = hour + ':' + minute;
var dateStr = year + '-' + month + '-' + day;
Page({


  /**
   * 页面的初始数据
   */
  data: {
    items:'',
    "menu": [{
      "icon": "cuIcon-btn text-green",
      "title": "居民服务",
      "url": "/pages/community/work/workform"
    }
  ]
  },
  showHelp: function () {
    wx.showModal({
      title: '帮助信息',
      content: '请选择您要进行的操作。',
      showCancel: false,
    });
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