// pages/community/activity/activity.js
const app = getApp();
const formatTime = require('../../../utils/utils');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    "activityData": [
      {
        "id": 1,
        "title": "社区活动1",
        "imgUrl": "https://img1.qunarzz.com/travel/poi/201403/28/daab198c5029a423ddb12cfb.jpg_r_720x400x95_0c4e4c13.jpg",
        "desc": "创建和谐社区，共建美好家园。创建文明和谐社区，共建温馨美好的家园！",
        "type": "活动",
        "datetime": "2023年5月26日",
        "tags": [
          { "name": "党组织生活", "color": "bg-red" },
          { "name": "活动", "color": "bg-green" }
        ]
      },
      {
        "id": 2,
        "title": "社区活动2",
        "imgUrl": "https://youimg1.c-ctrip.com/target/100i10000000o9w0fE878.jpg",
        "desc": "普及志愿服务理念 促进和谐社区建设，创展文明社区，建美好家园。",
        "type": "活动",
        "datetime": "2023年5月26日",
        "tags": [
          { "name": "党组织生活", "color": "bg-red" },
          { "name": "活动", "color": "bg-green" }
        ]
      }
    ]
  },
  onNav(e){
    console.log(e)
    var id = e.currentTarget.dataset.item.id
    // 跳转到详情页面
    wx.navigateTo({
      url: '/pages/community/activity/detail?id=' + id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this
    wx.request({
      url: app.globalData.apiUri + 'api/v1/community/activity/',
      method: 'GET',
      success(res) {
        if (res.statusCode == 200) {
          console.log("活动信息获取成功",res.data)
          var items = res.data
          // 读取成功
          var date = new Date(items[0].created_at);
          var formattedTime = formatTime(date);
          // 格式化时间为指定格式（例如：2023-07-29 20:18:41）
          var formattedTime = date.toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai', hour12: false }).replace(/\//g, '-');
          items[0].created_at = formattedTime;
          if (items.length > 0) {
            that.setData({
              activityData: items
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