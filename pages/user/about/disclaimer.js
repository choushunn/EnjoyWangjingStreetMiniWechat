// pages/user/about/disclaimer.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: {
      "title": "免责声明",
      "content": "用户在使用乐享王井街提供的各项服务之前，应该仔细阅读《乐享王井街用户协议》（以下简称'本协议'）。用户一旦登录或使用乐享王井街的服务，即视为用户已了解并明示同意本协议各项内容，本协议立即在用户与乐享王井街之间产生法律效力。用户登录、使用本产品服务的全活动将受到本协议的约束并承担相应的责任和义务。",
      "name": "",
      "created_at": "2023/08/12"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // var that = this;
    wx.request({
      // url: app.globalData.apiUri+'pages/',
      url: app.globalData.apiUri + 'pages/',
      method: 'GET',
      success(res) {
        console.log(res)
        if (res.statusCode == 200 && res.data.length > 0) {
          that.setData({
            item: res.data
          })
        }
      }
    })
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