// pages/user/home/home.js
const app = getApp();
Component({
  /**
   * 页面的初始数据
   */
  data: {    
    avatarUrl: app.globalData.defaultAvatarUrl,
    userinfo:wx.getStorageSync('userinfo'),
    // 我的菜单
    myMenuItems: [{
      icon: 'cardboardfill',
      color: 'red',
      badge: 0,
      name: '我的收藏',
      url:'/pages/user/myfaver/myfaver'
    }, {
      icon: 'picfill',
      color: 'yellow',
      badge: 0,
      name: '我的消息',
      url:'/pages/user/mymessage/mymessage'
    }, {
      icon: 'noticefill',
      color: 'olive',
      badge: 0,
      name: '我的工单',
      url:'/pages/user/myorder/myorder'
    }, {
      icon: 'upstagefill',
      color: 'cyan',
      badge: 0,
      name: '我的反馈',
      url:'/pages/user/myfeedback/myfeedback'
    }, {
      icon: 'clothesfill',
      color: 'blue',
      badge: 0,
      name: '我的预约',
      url:'/pages/user/myappointment/myappointment'
    }
   ],
    // 关于菜单
    aboutMenuItems: [
      {
        id: 1,
        name: '关于我们',
        icon: 'info',
        color:'cyan',
        url: '/pages/user/about/about',
        handler: 'toPage'
      },
      {
        id: 2,
        name: '更新日志',
        icon: 'formfill',
        color:'green',
        url: '/pages/user/logs/logs',
        handler: 'toPage'
      },
      {
        id: 3,
        name: '免责声明',
        icon: 'text',
        color:'cyan',
        url: '',
        handler: 'showDisclaimer'
      },
      {
        id: 4,
        name: '隐私政策',
        icon: 'safe',
        color:'cyan',
        url: '',
        handler: 'showPrivacyPolicy'
      },
      {
        id: 5,
        name: '用户协议',
        icon: 'file',
        color:'cyan',
        url: '',
        handler: 'showUserAgreement'
      },
      {
        id: 6,
        name: '赞赏支持',
        icon: 'appreciatefill',
        color:'red',
        url: '',
        handler: 'showQrcode'
      }
    ]
  },
  lifetimes:{
    attached(){
      const userinfo = wx.getStorageSync('userinfo');
      if (userinfo) {
        this.setData({
          userinfo:userinfo,
          avatarUrl:app.globalData.apiUri+'avatar/'+userinfo.open_id+'.jpg'
        });
      }else{
        console.log("当前用户未登录")
      }
    }
  },
  methods: {    
    toPage: function (event) {
      var url = event.currentTarget.dataset.url
      wx.navigateTo({
        url: url
      })
    },
    onLogout(){
      // 清除用户数据
      wx.removeStorageSync('username')
      // 刷新页面
      wx.reLaunch({
        url: '/pages/user/home/home',
      })
    },
    showDisclaimer: function () {
      wx.showToast({
        title: '免责声明',
        icon: 'none'
      })
    },
    showPrivacyPolicy: function () {
      wx.showToast({
        title: '隐私政策',
        icon: 'none'
      })
    },
    showUserAgreement: function () {
      wx.showToast({
        title: '用户协议',
        icon: 'none'
      })
    },
    showQrcode: function () {
      wx.showToast({
        title: '赞赏支持',
        icon: 'none'
      })
    },
  }
})