// pages/user/login/login.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: defaultAvatarUrl,
    theme: wx.getSystemInfoSync().theme,
  },
  // 登录逻辑    
  doLogin() {
    // 调用微信登录接口，获取用户的 code
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取用户登录凭证，然后进行登录操作
        wx.request({
          url: 'https://yourdomain.com/login',
          data: {
            code: res.code,
            encryptedData: e.detail.encryptedData,
            iv: e.detail.iv
          },
          success: res => {
            // 登录成功，将用户信息保存到全局变量中
            getApp().globalData.userInfo = res.data.userInfo
            // 进行跳转或其他操作
            console.log(getApp().globalData.userInfo)
          },
          fail: res => {
            // 登录失败，进行处理
            console.log(res)
            
          }
        })
      }
    })
  },
  // 定义一个获取用户手机号码的函数
  getPhoneNumber(e) {
    
    console.log(e.detail.code) // 动态令牌
    console.log(e.detail.errMsg) // 回调信息（成功失败都会返回）
    console.log(e.detail.errno) // 错误码（失败时返回）
    // 判断用户是否授权手机号码
    if (e.detail.errMsg == 'getPhoneNumber:ok') {
      // 获取用户手机号码并进行登录操作
      doLogin()
    } else {
      // 用户拒绝授权手机号码，进行处理
      console.log('用户拒绝授权手机号码')      
    }
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
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
  onChooseAvatar(e) {
    const {
      avatarUrl
    } = e.detail
    this.setData({
      avatarUrl,
    })
  },
  formSubmit(e) {
    console.log('昵称：', e.detail.value.nickname)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.onThemeChange((result) => {
      this.setData({
        theme: result.theme
      })
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