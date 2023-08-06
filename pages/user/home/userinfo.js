// pages/user/home/userinfo.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: app.globalData.defaultAvatarUrl,
    userinfo:null
  },
  changeNickname(e) {
    console.log(e)
    var formData = e.detail.value
    wx.request({
      url: 'url',
      method:'PUT',
      data:formData,
      success(res){
          console.log(res)
      }
    })
  },
  chooseImage: function () {
    var that = this
    wx.chooseMedia({
      count: 1, // 只能选择一张图片
      mediaType: ['image'],
      sourceType: ['album', 'camera'], // 从相册选择
      sizeType: ['compressed'],
      success: function (res) {
        // 选择成功后的逻辑处理
        var tempFilePath = res.tempFiles[0].tempFilePath;
        // console.log(tempFilePath)
        wx.cropImage({
          src: tempFilePath, // 图片路径
          cropScale: '1:1', // 裁剪比例
          success(res) {
            console.log(res)
            // 将选择的图片路径赋值给avatarUrl变量
            that.setData({
              avatarUrl: res.tempFilePath
            });

            // 上传到服务器
            // wx.uploadFile({
            //   filePath: res.tempFilePath,
            //   name: 'avatar',
            //   method:'PUT',
            //   url: app.globalData.apiUri+'user/'+that.data.userinfo.id+'/',
            //   success(res){
            //     console.log(res)
            //   },fail(res){
            //     console.log(res)
            //   }
            // })
          }
        })
      }
    })
  },
  // 修改信息模态框
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var userinfo = JSON.parse(options.item)
    this.setData({
      userinfo: userinfo
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