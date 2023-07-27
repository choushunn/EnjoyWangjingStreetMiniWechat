// pages/user/login/login.js
// 默认头像
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const app = getApp();
Page({
  //  页面的初始数据
  data: {
    avatarUrl: defaultAvatarUrl,
    nickname: "",
    modalName: '',
    phoneCode: '',
    isRegister: false,
  },
  // 点击登录按钮
  onLogin() {
    console.log("直接登录")
    // 发起登录请求
    wx.login({
      success: res => {
        wx.request({
          url: app.globalData.apiUri + 'login',
          method: 'POST',
          data: {
            code: res.code,
          },
          success: res => {
            // 调用成功后跳转到首页
            wx.navigateTo({
              url: '/pages/index/index',
            });
            // 保存token到本地
            // 保存用户信息到本地
          }
        })
      },
    });
  },
  // 获取用户手机号码
  getPhoneNumber(e) {
    if (e.detail.errMsg == 'getPhoneNumber:ok') {
      // 保存用户手机号码code
      this.setData({
        phoneCode: e.detail.code
      })
      console.log(this.data)
    
      wx.setStorageSync('userinfo', JSON.stringify(this.data));
      wx.navigateTo({
        url: '/pages/index/index',
      })
      // 发起注册请求
      wx.login({
        success: res => {
          wx.request({
            url: app.globalData.apiUri + 'login',
            method: 'POST',
            data: {
              code: res.code,
              avatarUrl: this.data.avatarUrl,
              nickname: this.data.nickname,
              phoneCode: this.data.phoneCode
            },
            success: res => {
              if (res.data.code === 0) {
                // 注册成功，保存 token 到本地存储
                wx.setStorageSync('token', res.data.data.token);
                // 跳转到首页
                wx.navigateTo({
                  url: '/pages/index/index',
                });
              } else {
                // 注册失败，弹出错误提示
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                });
              }
            },
            fail: () => {
              wx.showToast({
                title: '登录失败,401',
                icon: 'none',
              });
            },
          });
        },
        fail: () => {
          wx.showToast({
            title: '登录失败,402',
            icon: 'none',
          });
        },
      });
    } else {
      // 用户拒绝授权手机号码
      console.log('用户拒绝授权手机号码');
      // 进行处理
    }
  },
  // 获取头像URL
  onChooseAvatar(e) {
    const {
      avatarUrl
    } = e.detail
    this.setData({
      avatarUrl: avatarUrl,
    })
  },
  // 获取昵称
  getNickname(e) {
    let nickname = e.detail.value.nickname
    if (!nickname) {
      // 没有获取到昵称
      console.log('获取昵称失败')
    } else {
      this.setData({
        nickname: nickname
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // // 判断用户是否已经注册
    // if (this.data.isRegister) {
    //   // 已经注册直接登录
    //   console.log("已经注册，可以直接登录")
    // } else {
    //   // 弹出模态框，进行注册
    //   console.log("没有注册,弹出注册Modal")
    //   this.setData({
    //     modalName: "Modal"
    //   })
    // }
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