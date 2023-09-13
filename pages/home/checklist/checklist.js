// pages/home/checklist/checklist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: '',
    menu: [{
      
      "sxmc": "事实无人抚养儿童基本生活补贴申报",
      "blfs": "帮办代办",
      "fwsj": "09:00—17:00(周一至周五）",
      "bjsx": "报送政府",
      "fwdx": "辖区居民",
      "sxyj": "身份证、户口簿及相关证明材料"
    }, 
    {
      "sxmc": "临时救助",
      "blfs": "帮办代办",
      "fwsj": "09:00—17:00(周一至周五）",
      "bjsx": "报送政府",
      "fwdx": "辖区居民",
      "sxyj": "身份证、户口簿及相关证明材料"
    }, 
    {
      "sxmc": "困难残疾人生活补贴",
      "blfs": "帮办代办",
      "fwsj": "09:00—17:00(周一至周五）",
      "bjsx": "报送政府",
      "fwdx": "辖区居民",
      "sxyj": "身份证、户口簿、残疾证、低保证、及相关证明材料"
    }]
  },
  // 跳转到功能页面
  toPage(e) {
    var url = e.currentTarget.dataset.url
    wx.navigateTo({
      url: url
    })
  },  // 跳转到详情页面
  toDetail(e) {
    console.log("e:",e)
    var id = e.currentTarget.dataset.item.id
    var current_item = e.currentTarget.dataset.item
    // console.log("item:",item)
    var item = JSON.stringify(current_item)
    // 跳转到详情页面
    wx.navigateTo({
      url: '/pages/home/checklist/detail?id=' + id + '&item=' + item,
    })
  },
  showHelp: function () {
    wx.showModal({
      title: '帮助信息',
      content: '请选择您要办理的事项',
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