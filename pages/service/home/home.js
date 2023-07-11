// pages/service/home/home.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    ColorList:app.globalData.ColorList,
    elements: [{

      title: '办事指南',
      name: 'layout',
      color: 'cyan',
      icon: 'newsfill'
    },
    {
      title: '办事大厅',
      name: 'background',
      color: 'blue',
      icon: 'servicefill'
    },
    {
      title: '政民互动',
      name: 'text',
      color: 'purple',
      icon: 'group'
    },
    {
      title: '预约服务 ',
      name: 'icon',
      color: 'mauve',
      icon: 'post'
    },
  ],

  elements2: [{

    title: '便民电话',
    color: 'cyan',
    icon: 'dianhua'
  },
  {
    title: '社区公示',
    name: 'background',
    color: 'blue',
    icon: 'calendar'
  },
  {
    title: '知识科普',
    name: 'text',
    color: 'purple',
    icon: 'read'
  },

],

elements3: [{

  title: '电费',
  color: 'white',
  icon: 'text'
},
{
  title: '水费',
  color: 'white',
  icon: 'upload'
},

{
  title: '物业费',
  color: 'white',
  icon: 'upload'
},
],
  },
  isCard(e) {
    this.setData({
      isCard: e.detail.value
    })
  },
  searchIcon(e) {
    console.log("搜索。。。。。")
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