//app.js
App({
  // 全局变量
  globalData: {
    userInfo: null,
    isLoggedIn: false,
    apiUri: "https://127.0.0.1/",
  },
  // 启动时
  onLaunch: function () {
    // 启动时检查本地存储中是否有用户信息
    var userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      // 如果有用户信息，则设置登录状态和用户信息
      this.globalData.isLoggedIn = true;
      this.globalData.userInfo = userInfo;
    }else{
    // 自动登录/没有注册则设置当前状态为未注册
    // 调用微信登录接口，获取用户的 code
    wx.login({
      success: (res) => {
        let code = res.code
        console.log("请求code:", res)
        wx.request({
          // 发送 res.code 到后台换取用户登录凭证，然后进行登录操作
          url: 'http://127.0.0.1:8000/admin/wxurl',
          method: "GET",
          data: {
            js_code: code,
          },
          success: (res) => {
            console.log("授权成功:", res.data)
            // 判断是否已经注册            
            this.globalData.isLoggedIn = res.data.data.is_login            
            console.log(this.globalData.isLoggedIn)
            // 没有注册则设置isLoggedIn为false
            // 登录成功，将用户信息保存到全局变量中
            // getApp().globalData.userInfo = res.data.userInfo
            // 进行跳转或其他操作            
          },
          fail: (err) => {
            console.log(err)
            // 登录失败，进行处理
          }
        })
      },
    })
    }
    // 获取系统状态栏信息
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
          this.globalData.Custom = capsule;
          this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
        } else {
          this.globalData.CustomBar = e.statusBarHeight + 50;
        }
      }
    })
    // 监听网络状态
    wx.getNetworkType({
      success: function (res) {
        var networkType = res.networkType;
        // 处理网络状态
        console.log(networkType)
      }
    })

    // 其他操作
  }
})