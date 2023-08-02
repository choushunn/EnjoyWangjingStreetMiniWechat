// pages/community/notice/details.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: '',
  },
  // 在点击事件中更新 currentId 变量的值
  onTapMessage: function (event) {
    var id = event.currentTarget.dataset.id;
    this.setData({
      currentId: id
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
     // 获取跳转页面传来的数据
     console.log(options)
     const itemObject = JSON.parse(options.item);
     console.log(itemObject);
     this.setData({
       item:itemObject
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