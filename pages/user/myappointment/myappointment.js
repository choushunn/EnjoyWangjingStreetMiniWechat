// pages/user/myappointment/myappointment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    scrollLeft: 0,
    messageData:[{
      id:0,
      title:"预约信息",
      status:0,
      desc:"您的预约信息已受理完成，请及时确认受理结果，点击查看详细。",
      datetime:"2023年7月14日 11:20",
      type:"预约结果通知",
      url:"/pages/user/myappointment/appointmentmessage"
    },{
      id:1,
      title:"预约信息",
      status:1,
      desc:"您的预约信息已被受理，请耐心等待受理结果，点击查看详细。",
      datetime:"2023年7月14日 11:20",
      type:"预约受理通知", 
      url:"/pages/user/myappointment/appointmentmessage"
    }]
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