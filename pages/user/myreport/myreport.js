// pages/user/myorder/myorder.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    scrollLeft: 0,
    scroll: 0,
    items: '',
    userinfo: wx.getStorageSync('userinfo'),
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  // 跳转到详情页面
  toDetail(e) {
    console.log(e)
    var id = e.currentTarget.dataset.item.id
    var item = JSON.stringify(e.currentTarget.dataset.item)
    // 跳转到详情页面
    wx.navigateTo({
      url: '/pages/user/myreport/detail?id=' + id + '&item=' + item,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this;
    wx.request({
      url: app.globalData.apiUri + 'report/by_user/?ordering=-created_at',
      method: 'GET',
      header:{
        "authorization":"Bearer "+ wx.getStorageSync('token')
      },
      success(res) {
        console.log("我的上报数据获取成功", res)
        var items = res.data
        if (res.statusCode == 200 && res.data.length > 0) {
          that.setData({
            items: items
          })
        } else {
          // 获取失败
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