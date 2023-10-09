// pages/community/appointment/appointment.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    "menu": [{
        "icon": "cuIcon-btn text-green",
        "title": "办事预约",
        "url": "/pages/community/appointment/serviceform"
      },
      {
        "icon": "cuIcon-tagfill text-red",
        "title": "邻里空间",
        "url": "/pages/community/appointment/roomform"
      }
    ]
  },
  // 点击帮助图标时显示帮助信息
  showHelp: function () {
    wx.showModal({
      title: '帮助信息',
      content: '预约服务的帮助。',
      showCancel: false,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var token = wx.getStorageSync('token')
    if (!token) {
      wx.showModal({
        title: '您还未登录',
        content: '请先登录后办理服务',
        complete: (res) => {
          if (res.cancel) {            
              wx.navigateBack({
                delta: 1
              })          
          }      
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/user/home/home',
            })
          }
        }
      })
    }
  },
  // 跳转到功能页面
  toPage(e) {
    var url = e.currentTarget.dataset.url
    wx.navigateTo({
      url: url
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