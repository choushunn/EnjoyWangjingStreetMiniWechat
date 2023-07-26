// pages/community/notice/notice.js
const app = getApp();
var now = new Date();
// 格式化时间
var year = now.getFullYear();
var month = now.getMonth() + 1;
var day = now.getDate();
var hour = now.getHours();
var minute = now.getMinutes();
var second = now.getSeconds();
// 将时间格式化为字符串
var timeStr =  hour + ':' + minute ;
var dateStr =  year + '-' + month + '-' + day ;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    time: timeStr,
    date: dateStr,
    TabCur: 0,
    scrollLeft: 0,
    messageData:[{
      id:0,
      title:"全国社区建设试点名单印发",
      status:0,
      desc:"为深入贯彻党的二十大精神,落实党中央、国务院有关决策部署,完善社区服务功能,补齐社区服务设施短板,在各地推荐基础上",
      datetime:"2023年7月14日 11:20",
      type:"",
      url:"/pages/community/notice/details"
    },{
      id:1,
      title:"住建部等7部门:在106个社区开展完整社区建设试点",
      status:1,
      desc:"住建部等7部门今日联合发布《关于印发完整社区建设试点名单的通知》,决定在106个社区开展完整社区建",
      datetime:"2023年7月14日 11:20",
      type:"", 
      url:"/pages/community/notice/details"
    },{
      id:2,
      title:"住建部等7部门:在106个社区开展完整社区建设试点",
      status:1,
      desc:"住建部等7部门今日联合发布《关于印发完整社区建设试点名单的通知》,决定在106个社区开展完整社区建",
      datetime:"2023年7月14日 11:20",
      type:"", 
      url:"/pages/community/notice/details"
    },{
      id:1,
      title:"住建部等7部门:在106个社区开展完整社区建设试点",
      status:1,
      desc:"住建部等7部门今日联合发布《关于印发完整社区建设试点名单的通知》,决定在106个社区开展完整社区建",
      datetime:"2023年7月14日 11:20",
      type:"", 
      url:"/pages/community/notice/details"
    },{
      id:1,
      title:"住建部等7部门:在106个社区开展完整社区建设试点",
      status:1,
      desc:"住建部等7部门今日联合发布《关于印发完整社区建设试点名单的通知》,决定在106个社区开展完整社区建",
      datetime:"2023年7月14日 11:20",
      type:"", 
      url:"/pages/community/notice/details"
    },{
      id:1,
      title:"住建部等7部门:在106个社区开展完整社区建设试点",
      status:1,
      desc:"住建部等7部门今日联合发布《关于印发完整社区建设试点名单的通知》,决定在106个社区开展完整社区建",
      datetime:"2023年7月14日 11:20",
      type:"", 
      url:"/pages/community/notice/details"
    }]
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  TimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX
    })
  },

  // ListTouch计算方向
  ListTouchMove(e) {
    this.setData({
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
    })
  },

  // ListTouch计算滚动
  ListTouchEnd(e) {
    if (this.data.ListTouchDirection =='left'){
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalName: null
      })
    }
    this.setData({
      ListTouchDirection: null
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