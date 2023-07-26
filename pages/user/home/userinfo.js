// pages/user/home/userinfo.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
token:'',
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.request({
      url: app.golobal.token+'/admin/auth/userinfo',
      method: 'GET',
      header: {
        'Authorization': 'Bearer ' + app.golobal.token
      },
      success(res) {
        console.log(res.data);
      },
      fail(err) {
        console.error(err);
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