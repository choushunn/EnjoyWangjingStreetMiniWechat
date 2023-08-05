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
    // apiUri: "http://139.155.139.25:8000/api/v1/", // 配置 API 地址
    // apiUri:"https://api.enjoywangjing.cn",
    apiUri: "http://192.168.121.138:8000/api/v1/",
    // 默认头像
    defaultAvatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
  },
  // 启动时
  onLaunch: function () {
    wx.setStorageSync('markersData', '')
    wx.setStorageSync('markers', '')
    wx.setStorageSync('currentTextData', '')
    const that = this;
    // 检查 API 是否可用
    wx.request({
      url: this.globalData.apiUri + 'login/',
      method: 'GET',
      success(res) {
        console.log(res)
        if (res.statusCode !== 200) {
          that.globalData.isApiAvailable = false;
          that.showMaintenanceTip();
        } else {
          that.globalData.isApiAvailable = true;
          console.log('API is available');
          // 尝试自动登录
          wx.login({
            success: (res) => {
              wx.request({
                url: that.globalData.apiUri + 'login/',
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
                  } else {
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
        }
      },
      fail(res) {
        that.globalData.isApiAvailable = false;
        that.showMaintenanceTip();
      }
    });
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
      title: '系统维护中',
      icon: 'error',
      duration: 3000,
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
  }
})