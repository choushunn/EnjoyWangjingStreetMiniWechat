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
    time: timeStr,
    date: dateStr,
    TabCur: 0,
    scrollLeft: 0,
    // 默认数据
    noticeData:[{
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
    }]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this
    wx.request({
      url: app.globalData.apiUri + 'admin/community/NotificationAdmin/list',
      method: 'POST',
      success(res) {
        if (res.statusCode == 200) {
          console.log(res.data.data.items)
          var items = res.data.data.items
          // 读取成功
          if (items.length > 0) {
            that.setData({
              noticeData: items
            })
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