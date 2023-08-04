// pages/user/myappointment/myappointment.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    scrollLeft: 0,
    messageData:'',
    userinfo:wx.getStorageSync('userinfo'),
  },  // 跳转到详情页面
  toDetail(e) {
    console.log(e)
    var id = e.currentTarget.dataset.item.id
    var item = JSON.stringify(e.currentTarget.dataset.item)
    // 跳转到详情页面
    wx.navigateTo({
      url: '/pages/user/myappointment/detail?id=' + id + '&item=' + item,
    })
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  basicsSteps() {
    this.setData({
      basics: this.data.basics == this.data.basicsList.length - 1 ? 0 : this.data.basics + 1
    })
  },
  numSteps() {
    this.setData({
      num: this.data.num == this.data.numList.length - 1 ? 0 : this.data.num + 1
    })
  },
  scrollSteps() {
    this.setData({
      scroll: this.data.scroll == 9 ? 0 : this.data.scroll + 1
    })
  },
  showHelp: function () {
    wx.showModal({
      title: '帮助信息',
      content: '我的预约记录',
      showCancel: false,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this;
    var user_id = this.data.userinfo.id
    const extraData = {
      user_id: user_id
    };
    wx.request({
      url: app.globalData.apiUri + 'appointment/by_user',
      method: 'GET',
      data:extraData,
      success(res) {
  
          console.log("我的预约获取成功", res.data)          
          if (res.statusCode == 200 && res.data.length>0) {
            var items = res.data
            that.setData({
              messageData: items
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