// pages/community/activity/activity.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    "messageData": [
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
      },
      {
        "id": 3,
        "title": "社区活动3",
        "imgUrl": "https://image.scol.com.cn/data/attachment/forum/202002/25/1582633049799.jpg",
        "desc": "折互帮互助好邻里，互敬互爱好家庭。打造平安大院，构建和谐社会。",
        "type": "活动",
        "datetime": "2023年5月26日",
        "tags": [
          { "name": "党组织生活", "color": "bg-red" },
          { "name": "活动", "color": "bg-green" }
        ]
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  isCard(e) {
    this.setData({
      isCard: e.detail.value
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