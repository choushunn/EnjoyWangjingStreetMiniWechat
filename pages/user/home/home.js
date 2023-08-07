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
        id: 1,
        name: '关于我们',
        icon: 'info',
        color: 'cyan',
        url: '/pages/user/about/about',
        handler: 'toPage'
      },
      {
        id: 2,
        name: '更新日志',
        icon: 'formfill',
        color: 'green',
        url: '/pages/user/logs/logs',
        handler: 'toPage'
      },
      {
        id: 3,
        name: '免责声明',
        icon: 'text',
        color: 'cyan',
        url: '/pages/user/about/disclaimer',
        handler: 'toPage'
      },
      {
        id: 4,
        name: '隐私政策',
        icon: 'safe',
        color: 'cyan',
        url: '/pages/user/about/privacy',
        handler: 'toPage'
      },
      {
        id: 5,
        name: '用户协议',
        icon: 'file',
        color: 'cyan',
        url: '/pages/user/about/agreement',
        handler: 'toPage'
      },
      {
        id: 6,
        name: '赞赏支持',
        icon: 'appreciatefill',
        color: 'red',
        url: '',
        handler: 'showQrcode'
      }
    ]
  },
  lifetimes: {
    created(){
      var that = this
      wx.request({
        url: app.globalData.apiUri + 'user/',
        header: {
          "authorization": "Bearer " + wx.getStorageSync('token')
        },
        method: 'GET',
        success(res) {
          console.log("获取用户信息成功：",res)
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
    toUserinfo(e){
      var url = e.currentTarget.dataset.url
      var item = JSON.stringify(e.currentTarget.dataset.userinfo)
      // 跳转到详情页面
      wx.navigateTo({
        url: url+'?item=' + item,
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
              success(){
                setTimeout(function(){
                  wx.reLaunch({
                    url: '/pages/index/index',              
                  })
                },1000)                
              }
            });            
          }
        }
      })
    },
    showQrcode: function () {
     wx.showToast({
       title: '赞赏支持',
       icon:'loading'
     })
    },
  }
})