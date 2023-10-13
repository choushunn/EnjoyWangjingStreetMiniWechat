// pages/basics/home/home.js
const app = getApp();

Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    TabCur: 0,
    scrollLeft: 0,
    elements1: [{
        title: '缴纳电费',
        name: '缴纳电费',
        color: 'cyan',
        icon: 'card',
        url: '',
        appid: 'wx5899bdb8721621d6',
      }, {
        title: '缴纳水费',
        name: '缴纳水费',
        color: 'red',
        icon: 'card',
        url: '',
        appid: 'wxd2ade0f25a874ee2',
      }, {
        title: '生活缴费',
        name: '生活缴费',
        color: 'orange',
        icon: 'card',
        url: '',
        appid: 'wxd2ade0f25a874ee2',
      }, {
        title: '政务服务',
        name: '政务服务',
        color: 'blue',
        icon: 'card',
        url: '',
        appid: 'wx2eec5fb00157a603',
      }, {
        title: '医疗健康',
        name: '医疗健康',
        color: 'pink',
        icon: 'card',
        url: '',
        appid: 'wxb032bc789053daf4',
      }, {
        title: '预约服务',
        name: 'icon',
        color: 'olive',
        icon: 'dianhua',
        url: '/pages/community/appointment/appointment'
      }, {
        title: '咨询服务',
        name: 'text',
        color: 'yellow',
        icon: 'group',
        url: '/pages/community/consult/consult'
      },
      {
        title: '意见反馈 ',
        name: 'icon',
        color: 'brown',
        icon: 'copy',
        url: '/pages/community/feedback/feedback'
      },
      {
        title: '问题上报',
        name: 'background',
        color: 'orange',
        icon: 'peoplefill',
        url: '/pages/community/report/report'
      },
    ],
    elements: [{
        name: '居民公约',
        color: 'red',
        icon: 'newsfill',
        url: '/pages/home/guideline'
      },
      {
        name: '便民电话',
        color: 'orange',
        icon: 'servicefill',
        url: '/pages/community/phone/phone'
      },
      {
        name: '居民服务',
        color: 'green',
        icon: 'group',
        url: '/pages/community/work/work'
      },
      {
        name: '服务清单',
        color: 'pink',
        icon: 'post',
        url: '/pages/home/checklist/checklist'
      },
    ],
    swiperList: [{
      type: 'image',
      image: 'https://img1.qunarzz.com/travel/poi/201403/28/daab198c5029a423ddb12cfb.jpg_r_720x400x95_0c4e4c13.jpg',
      description: ''
    }]
  },
  lifetimes: {
    created: function () {
      var that = this;
      // 请求轮播图数据
      wx.request({
        url: app.globalData.apiUri + 'carousel/', // 后台接口地址
        method: "GET",
        success: function (res) {
          console.log("轮播图请求成功：", res.data); // 打印后台返回的数据
          if (res.data.length > 0) {
            that.setData({
              swiperList: res.data // 将后台返回的数据绑定到页面的 swiperList 变量中
            });
          } else {
            console.log("轮播图数据为空")
          }
        },
      });
      // 请求首页菜单数据
      wx.request({
        url: app.globalData.apiUri + 'menu_category/?url=home', // 后台接口地址
        method: "GET",
        success: function (res) {
          console.log("菜单请求成功：", res); // 打印后台返回的数据
          if (res.data[0].items.length > 0) {
            that.setData({
              elements: res.data[0].items // 将后台返回的数据绑定到页面的 elements 变量中
            });
          }
        },
      });
    },
    ready: function () {

    }
  },
  methods: {
    openPopup() {
      this.setData({
        showPopup: true
      });
    },
    
    onClosePopup() {
      this.setData({
        showPopup: false
      });
    },
    // 跳转功能页面
    toPage(e) {
      var url = e.currentTarget.dataset.url
      wx.navigateTo({
        url: url
      })
    },
    toMini(e) {
      console.log(e)
      var appId = e.currentTarget.dataset.appid
      wx.navigateToMiniProgram({
        appId: appId,
        path: '',
        envVersion: 'release',
        success(res) {
          // 打开成功
        }
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
    tabSelect(e) {
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        scrollLeft: (e.currentTarget.dataset.id - 1) * 60
      })
    },
    allowNotice() {
      wx.getSetting({
        withSubscriptions: true,
        success(res) {
          var tempId = 'ulg9KZqdxKK_CqX4cQ_l3mIu0-vt5fcmqsHSo1ImQTI'
          console.log(res)
          if (res.subscriptionsSetting && res.subscriptionsSetting.mainSwitch && res.subscriptionsSetting.itemSettings) {
            const itemSettings = res.subscriptionsSetting.itemSettings
            if (itemSettings[tempId] === 'reject') { // 用户已拒绝
              wx.showModal({
                title: '温馨提示',
                content: '您未开启订阅消息权限，是否前往设置打开？',
                confirmText: '去开启', // 这里可以自定义确认按钮文本
                success(res) {
                  if (res.confirm) {
                    wx.openSetting({
                      success(res) {},
                      fail(res) {}
                    })
                  }
                }
              })
            } else if (itemSettings[tempId] === 'accept') { // 用户已授权
              // 在此处写调用订阅消息的函数
              console.log("用户已经订阅")
            } else { // 未曾订阅
              console.log("用户未曾订阅")
              wx.requestSubscribeMessage({
                tmplIds: [tempId],
                success(res) {
                  if (res[tempId] === 'accept') {
                    // 在此处写订阅消息成功后的调用函数
                  }
                },
                fail(res) {
                  console.log(res)
                }
              })
            }
          } else {
            wx.requestSubscribeMessage({
              tmplIds: [tempId],
              success(res) {
                if (res[tempId] === 'accept') {
                  // 在此处写订阅消息成功后的调用函数
                }
              },
              fail(res) {
                console.log(res)
              }
            })
          }

        },
        fail(res) {
          console.log(res)
        }
      })

    },
    agree(e) {
      console.log("用户同意隐私授权, 接下来可以调用隐私协议中声明的隐私接口")
      this.allowNotice()
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
    linkNews(e) {
      console.log(e);
      wx.switchTab({
        url: '/pages/user/home/home'
      })
    }
  }
})