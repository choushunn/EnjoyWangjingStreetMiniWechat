// pages/user/myappointment/appointmentmessage.js
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
      name:"张某某",
      type:"活动室",
      desc:"某某某活动室，使用时间2023-7-26，使用时间1天",
      service:"某某某活动室预约已提交",
      record:"某某某活动室预约已受理",
      result:"某某某活动室预约成功"
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