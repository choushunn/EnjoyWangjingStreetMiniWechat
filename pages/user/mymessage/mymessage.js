// pages/user/mymessage/mymessage.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    scrollLeft: 0,
    items:null,
    userinfo:wx.getStorageSync('userinfo'),
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this;
    const extraData = {
      
    };
    wx.request({
      url: app.globalData.apiUri + 'message/',
      method: 'GET',
      data:extraData,
      header:{
        "authorization":"Bearer "+ wx.getStorageSync('token')
      },
      success(res) {
        if (res.statusCode == 200) {
          console.log("我的消息数据获取成功", res.data)
          var items = res.data
          if (res.statusCode == 200 && res.data.length>0) {
            that.setData({
              items: items
            })
          } else {
            // 获取失败
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