//app.js
App({
  // 全局变量
  globalData: {
    userInfo: null,
    isLoggedIn: false,
    isApiAvailable: false,
    networkType: '', // 记录网络状态
    StatusBar: 0,
    Custom: null,
    CustomBar: 0,
    apiUri: "https://192.168.121.138:8000/",// 配置 API 地址
    // apiUri:"https://api.enjoywangjing.cn"
  },
  // 启动时
  onLaunch: function () {
    const that = this;
    // 检查 API 是否可用
    wx.request({
      url: this.globalData.apiUri,
      success(res) {
        console.log(res)
        if (res.statusCode !== 200) {
          that.globalData.isApiAvailable = false;
          that.showMaintenanceTip();
        } else {
          that.globalData.isApiAvailable = true;
          console.log('API is available');
        }
      },
      fail(res) {
        that.globalData.isApiAvailable = false;
        that.showMaintenanceTip();
      }
    });
    // 检查本地存储中是否有用户信息和 Token
    const token = wx.getStorageSync('token');
    if (token) {
      // 如果已经登录，则更新 Token
      wx.request({
        url: this.globalData.apiUri + 'token', // 请求 Token API
        method: 'POST',
        data: {
          token: token,
        },
        success: function (res) {
          if (res.data.code === 0) {
            // Token 验证成功，则更新本地缓存中的 Token
            wx.setStorageSync('token', res.data.data.token);
          } else {
            // Token 验证失败，则跳转到登录页面
            that.showExpireTip();
          }
        },
        fail: function () {
          console.error('请求 Token API 失败');
        },
      });
    } else {
      // 如果本地缓存中没有用户信息，则跳转到登录页面
      that.navigateToLogin();
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
    wx.onNetworkStatusChange(function (res) {
      that.globalData.networkType = res.networkType;
      // 处理网络状态
      console.log(res.networkType);
    });
    // 其他操作
  },
  // 显示服务维护中的提示
  showMaintenanceTip() {
    wx.showToast({
      title: '服务维护中，请稍后再试',
      icon: 'none',
      duration: 2000,
      complete() {
        // 禁用页面上的交互元素
        wx.disableAlertBeforeUnload({
          success() {
            wx.setNavigationBarTitle({
              title: '服务维护中',
            });
          },
        });
      },
    });
  },
  // 显示登录已过期的提示
  showExpireTip() {
    wx.showModal({
      title: '提示',
      content: '登录已过期，请重新登录',
      showCancel: false,
      complete() {
        // 跳转到登录页面
        wx.navigateTo({
          url: '/pages/user/login/login',
        });
      },
    });
  },
  // 跳转到登录页面
  navigateToLogin() {
    // wx.navigateTo({
    //   url: '/pages/user/login/login',
    // });
  },
})