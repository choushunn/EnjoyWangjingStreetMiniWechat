// pages/community/phone/phone.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dianhuadata: ''
  },
  onSearch: function (e) {
    console.log(e)
    const keyword = '10081';
    const filteredData = this.data.dianhuadata.filter(item => {
      return item.number.indexOf(keyword) !== -1;
    });
    this.setData({
      dianhuadata: filteredData,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this
    wx.request({
      url: app.globalData.apiUri + 'telephone/',
      method: 'GET',
      success(res) {
        if (res.statusCode == 200) {
          console.log("便民电话获取成功：", res.data)
          var items = res.data
          // 读取成功
          if (items.length > 0) {
            that.setData({
              dianhuadata: items
            })
          }
        }
      }
    })
  },
  showHelp: function () {
    wx.showModal({
      title: '帮助信息',
      content: '提供常用的电话',
      showCancel: false,
    });
  },clickCall(e){
    console.log(e)
    let phone=e.currentTarget.dataset.phone;
    wx.makePhoneCall({//调用拨打电话的函数
      phoneNumber: phone,
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