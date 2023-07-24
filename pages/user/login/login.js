// pages/user/login/login.js
// 默认头像
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: defaultAvatarUrl,
    nickname: "",
    // isLogIn:app.globalData.isLoggedIn,
    isLogIn: false,
    modalName: ''
  },
  onTap() {
    if (this.data.isLogIn) {
      // 直接登录逻辑
      console.log("登录")
      this.doLogin()
    } else {
      // 获取头像和昵称逻辑
      console.log("注册")
      this.setData({
        modalName: "Modal"
      })
    }
  },
  // 登录逻辑    
  doLogin(e) {
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  // 定义一个获取用户手机号码的函数
  getPhoneNumber(e) {
    console.log(e.detail.code) // 动态令牌
    console.log(e.detail.errMsg) // 回调信息（成功失败都会返回）
    console.log(e.detail.errno) // 错误码（失败时返回）
    this.doLogin()
    // 判断用户是否授权手机号码
    if (e.detail.errMsg == 'getPhoneNumber:ok') {
      // 获取用户手机号码      
    } else {
      // 用户拒绝授权手机号码，进行处理
      console.log('用户拒绝授权手机号码')
    }
  },
  // 显示模态框
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  // 关闭模态框
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  // 获取头像URL
  onChooseAvatar(e) {
    const {
      avatarUrl
    } = e.detail
    this.setData({
      avatarUrl: avatarUrl,
    })
    console.log('临时avatarUrl: ', avatarUrl)
  },
  // 获取昵称
  submit(e) {
    let nickname = e.detail.value.nickname
    if (!nickname) {
      // 没有获取到昵称
      console.log('获取昵称失败')
    } else {
      this.setData({
        nickname: nickname
      })
    }
    console.log('昵称：', nickname)
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