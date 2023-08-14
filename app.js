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
    // apiUri:"https://api.enjoywangjing.cn/api/v1/",
    // apiUri:"https://api.yfengl.cn/api/v1/",
    apiUri: "http://192.168.121.138:8000/api/v1/",
    // 默认头像
    defaultAvatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
  },
  // 启动时
  onLaunch: function () {
    // 小程序自动更新
    if (wx.canIUse("getUpdateManager")) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        console.log("版本更新：", res)
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
     
        }
      })
      updateManager.onUpdateReady(function () {
        wx.showModal({
          title: "更新提示",
          content: "新版本已经准备好，是否重启应用？",
          success: function (res) {
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate()
            }
          }
        })
      })
      updateManager.onUpdateFailed(function () {
        // 新的版本下载失败
        wx.showModal({
          title: "已经有新版本了哟~",
          content: "新版本已经上线啦~，请您关闭当前小程序，重新搜索打开哟~"
        })
      })
    }
    wx.setStorageSync('markersData', '')
    wx.setStorageSync('markers', '')
    const that = this;
    // 检查 API 是否可用
    wx.request({
      url: this.globalData.apiUri + 'news/',
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
                url: that.globalData.apiUri + 'user/',
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