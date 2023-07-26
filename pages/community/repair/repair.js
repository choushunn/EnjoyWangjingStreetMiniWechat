// pages/community/repair/repair.js
const app = getApp();
var now = new Date();
// 格式化时间
var year = now.getFullYear();
var month = now.getMonth() + 1;
var day = now.getDate();
var hour = now.getHours();
var minute = now.getMinutes();
var second = now.getSeconds();
// 将时间格式化为字符串
var timeStr = hour + ':' + minute;
var dateStr = year + '-' + month + '-' + day;
Page({


  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    time: timeStr,
    date: dateStr,
    imgList: [],
    "menu": [{
        id: 0,
        "icon": "cuIcon-btn text-green",
        "title": "服务事项1",
        "url": "/pages/community/repair/form"
      },
      {
        id: 1,
        "icon": "cuIcon-tagfill text-red",
        "title": "服务事项2",
        "url": "/pages/community/repair/form"
      }
    ],
    TabCur: 0,
    scrollLeft: 0,
    messageData:[{
      id:0,
      title:"居民服务",
      status:0,
      desc:"您的报修已完成维修，请及时确认维修结果，点击查看详细。",
      datetime:"2023年7月14日 11:20",
      type:"报修结果通知",
      url:"/pages/user/myorder/detail"
    },{
      id:1,
      title:"居民服务",
      status:1,
      desc:"您的报修已被接单，请耐心等待维修，点击查看详细。",
      datetime:"2023年7月14日 11:20",
      type:"报修接单通知", 
      url:"/pages/user/myorder/detail"
    },{
      id:1,
      title:"居民服务",
      status:1,
      desc:"您的报修已被接单，请耐心等待维修，点击查看详细。",
      datetime:"2023年7月14日 11:20",
      type:"报修接单通知", 
      url:"/pages/user/myorder/detail"
    },{
      id:1,
      title:"居民服务",
      status:1,
      desc:"您的报修已被接单，请耐心等待维修，点击查看详细。",
      datetime:"2023年7月14日 11:20",
      type:"报修接单通知", 
      url:"/pages/user/myorder/detail"
    },{
      id:1,
      title:"居民服务",
      status:1,
      desc:"您的报修已被接单，请耐心等待维修，点击查看详细。",
      datetime:"2023年7月14日 11:20",
      type:"报修接单通知", 
      url:"/pages/user/myorder/detail"
    }]
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

  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '召唤师',
      content: '确定要删除这段回忆吗？',
      cancelText: '再看看',
      confirmText: '再见',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  save_data(e) {
    console.log("正在保存")
  },
  submit_data(e) {
    console.log("正在提交")
  },
  showHelp: function () {
    wx.showModal({
      title: '帮助信息',
      content: '请选择您要进行的操作。',
      showCancel: false,
    });
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