// pages/user/myorder/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count: 5,
    active: 0,
    score: 1,
    messageData:[{
      id:0,
      title:"某某故障-无法上网",
      type:"普通工单",
      desc:"某某地点出现情况",
      service:"某某某地方进行维修",
      record:"某某社工已进行处理",
      result:"某某地方已修复"
 
    }]
  },
  /**
   * 点击评分
   */
  click(e) {
    const {
      score,
      count
    } = this.data;
    const active = e.currentTarget.dataset.index;
    this.setData({
      active
    })
    this.triggerEvent("click", {
      result: score / count * active
    }, {})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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