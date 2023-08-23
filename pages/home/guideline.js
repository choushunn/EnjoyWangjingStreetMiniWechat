// pages/home/home/guideline.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: {
      "title": "用户协议",
      "content": "用户协议的内容",
      "name": "",
      "created_at": "2023/08/12"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that =this
    wx.request({
      // url: app.globalData.apiUri+'pages/',
      url: app.globalData.apiUri + 'pages/?name=guideline',
      method: 'GET',
      success(res) {
        console.log(res)
        if (res.statusCode == 200 && res.data.length > 0) {
          that.setData({
            item: res.data[0]
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