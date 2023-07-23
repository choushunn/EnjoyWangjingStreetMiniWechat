//app.js
App({
  // 全局变量
  globalData: {
    userInfo: null,
    isLoggedIn: false,
  },
  // 启动时
  onLaunch: function () {
    // 检查本地存储中是否有用户信息
    var userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      // 如果有用户信息，则设置登录状态和用户信息
      this.globalData.isLoggedIn = true;
      this.globalData.userInfo = userInfo;
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
      success: function(res) {
        var networkType = res.networkType;
        // 处理网络状态
        console.log(networkType)
      }
    })
    // 其他操作
  }
})