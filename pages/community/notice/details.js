// pages/community/notice/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // currentId: -1,
    messageData:[{
      id:0,
      title:"全国社区建设试点名单印发",
      status:0,
      desc:"为深入贯彻党的二十大精神,落实党中央、国务院有关决策部署,完善社区服务功能,补齐社区服务设施短板,在各地推荐基础上印发全国社区建设设点名单。是加强社区建设、提高社区服务水平、完善社区服务设施、保障群众基本生活需求等目的而实施的重要措施。",
      datetime:"2023年7月14日",
    }],
  },
// 在点击事件中更新 currentId 变量的值
onTapMessage: function(event) {
  var id = event.currentTarget.dataset.id;
  this.setData({
    currentId: id
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