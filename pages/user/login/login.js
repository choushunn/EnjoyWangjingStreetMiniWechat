// pages/user/login/login.js

const app = getApp();
Page({
  //  页面的初始数据
  data: {
    avatarUrl: app.globalData.defaultAvatarUrl,
    nickname: "",
    modalName: '',
    phoneCode: '',
    isRegister: false,
  },
  // 点击登录按钮
  onLogin() {
    console.log("尝试直接登录")
    var that =this
    // 尝试自动登录
    wx.login({
      success: (res) => {
        wx.request({
          url: app.globalData.apiUri + 'user/',
          method: 'POST',
          data: {
            js_code: res.code,
          },
          success: res => {
            console.log('登录返回信息：', res)
            var response = res.data
            if (res.statusCode === 200) {
              // 登录成功，设置全局用户信息
              wx.setStorageSync('token', response.access);
              wx.showToast({
                title: "登录成功！",
                icon: 'success',
                success(){
                  setTimeout(function(){
                    wx.reLaunch({
                      url: '/pages/index/index',              
                    })
                  },1000)                
                }
              });
              
            } else if(res.statusCode==406){
              // 跳转到首页
              wx.showToast({
                title: "请先注册！",
                icon: 'success',
              });
              setTimeout(function () {
                that.setData({
                  modalName: "Modal"
                })
              }, 500);              
            }else {
              // 登录失败，清除用户信息
              wx.removeStorageSync('token')
            }
          },
          fail: res => {
            console.log("登录失败：", res)
            wx.removeStorageSync('token')
          }
        })
      },
    })
  },
  // 获取用户手机号码
  getPhoneNumber(e) {
    if (e.detail.errMsg == 'getPhoneNumber:ok') {
      // 保存用户手机号码code
      this.setData({
        phoneCode: e.detail.code
      })
      console.log("注册请求：", this.data)
      // 发起注册请求
      wx.login({
        success: res => {
          wx.uploadFile({
            url: app.globalData.apiUri + 'user/',
            filePath: this.data.avatarUrl,
            name: 'avatar',
            formData: {
              nickname: this.data.nickname,
              js_code: res.code,
              phone_code: this.data.phoneCode
            },
            success: function (res) {
              console.log('注册返回信息：', res)
              if (res.statusCode === 201) {
                var response = JSON.parse(res.data)
                console.log('注册接口返回的信息：', response)
                // 登录成功，设置全局用户信息
                wx.setStorageSync('token', response.access);
                setTimeout(function () {
                  wx.showToast({
                    title: "登录成功！",
                    icon: 'success',
                  });
                }, 1000);
                // 跳转到首页
                wx.reLaunch({
                  url: '/pages/index/index',
                })
              } else {
                // 注册失败，弹出错误提示
                wx.showToast({
                  title: '暂时不能注册',
                  icon: 'error',
                });
              }
            },
            fail: () => {
              wx.showToast({
                title: '登录失败，请选择头像',                
                icon: 'error',
              });
            },
          })
        },
        fail: () => {
          wx.showToast({
            title: '系统维护中',
            icon: 'error',
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