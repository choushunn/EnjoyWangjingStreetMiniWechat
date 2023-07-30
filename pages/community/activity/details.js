// pages/community/activity/details.js
const app = getApp();
var formatTime = require('../../../utils/utils');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityData: [{
      id: 1,
      "title": "社区活动1",
      "image": "https://img1.qunarzz.com/travel/poi/201403/28/daab198c5029a423ddb12cfb.jpg_r_720x400x95_0c4e4c13.jpg",
      "summary": "创建和谐社区，共建美好家园。创建文明和谐社区，共建温馨美好的家园！",
      "type": "活动",
      "datetime": "2023年5月26日",
      "tags": [{
          "name": "党组织生活",
          "color": "bg-red"
        },
        {
          "name": "活动",
          "color": "bg-green"
        }
      ]
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const id = options.id
    const that = this;
    console.log(options.id)

    wx.request({
      url: app.globalData.apiUri + 'api/v1/community/activity/', // 后台接口地址
      method:"GET",
      success: function (res) {
        console.log("活动内容请求成功：",res.data); // 打印后台返回的数据
        var date = new Date(res.data[0].created_at);
        var formattedTime = formatTime(date);
        // 格式化时间为指定格式（例如：2023-07-29 20:18:41）
        var formattedTime = date.toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai', hour12: false }).replace(/\//g, '-');
        res.data[0].created_at = formattedTime;
        that.setData({
          activityData: res.data // 将后台返回的数据绑定到页面的 newsData 变量中
        });         
      },
    });
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