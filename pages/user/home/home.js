// pages/user/home/home.js
const app = getApp();
Component({
  /**
   * 页面的初始数据
   */
  data: {
    defaultAvatarUrl: app.globalData.defaultAvatarUrl,
    userinfo: null,
    // 我的菜单
    myMenuItems: [{
      icon: 'cardboardfill',
      color: 'red',
      badge: 0,
      name: '我的收藏',
      url: '/pages/user/myfaver/myfaver'
    }, {
      icon: 'picfill',
      color: 'yellow',
      badge: 0,
      name: '我的消息',
      url: '/pages/user/mymessage/mymessage'
    }, {
      icon: 'noticefill',
      color: 'olive',
      badge: 0,
      name: '我的工单',
      url: '/pages/user/myorder/myorder'
    }, {
      icon: 'upstagefill',
      color: 'cyan',
      badge: 0,
      name: '我的反馈',
      url: '/pages/user/myfeedback/myfeedback'
    }, {
      icon: 'clothesfill',
      color: 'blue',
      badge: 0,
      name: '我的预约',
      url: '/pages/user/myappointment/myappointment'
    }, {
      icon: 'card',
      color: 'pink',
      badge: 0,
      name: '我的上报',
      url: '/pages/user/myreport/myreport'
    }],
    // 关于菜单
    aboutMenuItems: [{
        name: '免责声明',
        icon: 'text',
        color: 'cyan',
        url: '/pages/user/about/disclaimer',
        handler: 'toPage'
      },
      {
        name: '隐私政策',
        icon: 'safe',
        color: 'cyan',
        url: '/pages/user/about/privacy',
        handler: 'toPage'
      },
      {
        name: '用户协议',
        icon: 'file',
        color: 'cyan',
        url: '/pages/user/about/agreement',
        handler: 'toPage'
      }, {
        name: '关于我们',
        icon: 'info',
        color: 'cyan',
        url: '/pages/user/about/about',
        handler: 'toPage'
      },
      {
        name: '更新日志',
        icon: 'formfill',
        color: 'green',
        url: '/pages/user/logs/logs',
        handler: 'toPage'
      },
      {
        name: '赞赏支持',
        icon: 'appreciatefill',
        color: 'red',
        url: '',
        handler: 'showQrcode'
      }
    ]
  },
  lifetimes: {
    created() {
      var that = this
      wx.request({
        url: app.globalData.apiUri + 'user/',
        header: {
          "authorization": "Bearer " + wx.getStorageSync('token')
        },
        method: 'GET',
        success(res) {
          console.log("获取用户信息成功：", res)
          if (res.statusCode == 200) {
            that.setData({
              userinfo: res.data[0],
            });
          }
        },
        fail(res) {
          console.log("当前用户未登录")
        }
      })
    },
    attached() {

    }
  },
  methods: {
    // 跳转到功能页面
    toPage: function (event) {
      var url = event.currentTarget.dataset.url
      wx.navigateTo({
        url: url
      })
    },
    onLogin(e) {
      // 检查权限
      // 同意后继续登录
      // 不同意没有操作
      // console.log("login")
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
            wx.request({
              url: app.globalData.apiUri + 'user_login/',
              method: "POST",
              data: {
                js_code: res.code,
                phone_code: this.data.phoneCode
              },
              success: function (res) {
                console.log('注册返回信息：', res)
                if (res.statusCode === 201) {
                  var response = res.data
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
                } else if (res.statusCode === 200) {
                  // 用户存在
                  var response = res.data
                  console.log('登录成功返回的信息：', response)
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
              fail(res) {
                console.log(res)
                wx.showToast({
                  title: '登录失败，上传文件失败',
                  icon: 'error',
                });
              },
            })
          },
          fail(res) {
            console.log(res)
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
    agree(e) {
      console.log("用户同意隐私授权, 接下来可以调用隐私协议中声明的隐私接口")
      wx.getClipboardData({
        success(res) {
          console.log("getClipboardData success", res)
        },
        fail(res) {
          console.log("getClipboardData fail", res)
        },
      })
    },
    disagree(e) {
      console.log("用户拒绝隐私授权, 未同意过的隐私协议中的接口将不能调用")
    },
    toUserinfo(e) {
      var url = e.currentTarget.dataset.url
      var item = JSON.stringify(e.currentTarget.dataset.userinfo)
      // 跳转到详情页面
      wx.navigateTo({
        url: url + '?item=' + item,
      })
    },
    onLogout() {
      // 刷新页面      
      wx.showModal({
        title: '退出登录',
        content: '',
        complete: (res) => {
          if (res.cancel) {
            console.log('用户点击取消')
          }
          if (res.confirm) {
            console.log('用户点击确定')
            wx.removeStorageSync('token')
            wx.showToast({
              title: "退出成功！",
              icon: 'success',
              success() {
                setTimeout(function () {
                  wx.reLaunch({
                    url: '/pages/index/index',
                  })
                }, 1000)
              }
            });
          }
        }
      })
    },
    showQrcode: function () {
      wx.requestSubscribeMessage({
        tmplIds: ['QFNd8u1LfsEDTObY8R5FMj-POgKOnO-vyMfCX0PmAKs', 'FyttljRvQRug1iwsHgy0mnWbL4HRORJX4LJM_G-Hq7M'],
        success(res) {
          console.log('调起成功', res);
          if (res[tempId[0]] === 'accept') {
            console.log('允许')
          }
          if (res[tempId[0]] === 'reject') {
            console.log('拒绝')
          }
        },
        fail(err) {
          if (err.errCode == 20004) {
            console.log('关闭小程序主开关')
          } else {
            console.log('订阅失败')
          }
        }
      })
      // wx.showToast({
      //   title: '赞赏支持',
      //   icon: 'loading'
      // })

    },
  }
})