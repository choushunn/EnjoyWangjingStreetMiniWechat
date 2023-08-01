// pages/community/consult/phone.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dianhuadata: [{
      title: "社区服务中心",
      number: "131121231311",
      desc: "某某事项",
      id: "1"
    }, ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this
    wx.request({
      url: app.globalData.apiUri + 'api/v1/community/telephone/',
      method: 'GET',
      success(res) {
        if (res.statusCode == 200) {
          console.log("咨询电话获取成功：",res.data)
          var items = res.data
          // 读取成功
          if (items.length > 0) {
            that.setData({
              dianhuadata: iwtems
            })
          }
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