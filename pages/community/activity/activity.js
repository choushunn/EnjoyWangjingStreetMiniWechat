// pages/community/activity/activity.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    items:''
  },
  showHelp: function () {
    wx.showModal({
      title: '帮助信息',
      content: '社区活动列表列表',
      showCancel: false,
    });
  },
  // 跳转到详情页面
  toDetail(e){
    console.log(e)
    var id = e.currentTarget.dataset.item.id
    var item = JSON.stringify(e.currentTarget.dataset.item)
    // 跳转到详情页面
    wx.navigateTo({
      url: '/pages/community/activity/detail?id=' + id + '&item=' + item,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this
    wx.request({
      url: app.globalData.apiUri + 'activity/',
      method: 'GET',
      success(res) {
        if (res.statusCode == 200 && res.data>0) {
          console.log("活动信息获取成功", res.data)
          var items = res.data
          if (res.statusCode==200) {
            that.setData({
              items: items
            })
          }else{
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