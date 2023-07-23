// pages/user/home/home.js
const app = getApp();
Component({
  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    iconList: [{
      icon: 'cardboardfill',
      color: 'red',
      badge: 10,
      name: '我的收藏',
      url:'/pages/user/myfaver/myfaver'
    }, {
      icon: 'picfill',
      color: 'yellow',
      badge: 10,
      name: '我的消息',
      url:'/pages/user/mymessage/mymessage'
    }, {
      icon: 'noticefill',
      color: 'olive',
      badge: 22,
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
    }, {
      icon: 'clothesfill',
      color: 'blue',
      badge: 0,
      name: '登录页面',
      url:'/pages/user/login/login'
    }],
    gridCol: 3,
    skin: false,
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    menuItems: [
      {
        id: 1,
        label: '关于我们',
        iconClass: 'cuIcon-info text-cyan',
        url: '/pages/user/about/about',
        handler: 'toPage'
      },
      {
        id: 2,
        label: '更新日志',
        iconClass: 'cuIcon-formfill text-green',
        url: '/pages/user/logs/logs',
        handler: 'toPage'
      },
      {
        id: 3,
        label: '免责声明',
        iconClass: 'cuIcon-text text-cyan',
        url: '',
        handler: 'showDisclaimer'
      },
      {
        id: 4,
        label: '隐私政策',
        iconClass: 'cuIcon-safe text-cyan',
        url: '',
        handler: 'showPrivacyPolicy'
      },
      {
        id: 5,
        label: '用户协议',
        iconClass: 'cuIcon-file text-cyan',
        url: '',
        handler: 'showUserAgreement'
      },
      {
        id: 6,
        label: '赞赏支持',
        iconClass: 'cuIcon-appreciatefill text-red',
        url: '',
        handler: 'showQrcode'
      }
    ]
  },

  toPage: function (event) {
    var url = event.currentTarget.dataset.url
    wx.navigateTo({
      url: url
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
  methods: {
    toPage(e) {
      wx.navigateTo({
        url: e.currentTarget.dataset.url
      })
    },
    onLogin() {
      wx.getUserProfile({
        desc: '用于完善用户资料',
        success:(res)=>{
          this.setData({
            userInfo:res.userInfo,
            hasUserInfo:true
          })
        },fail:(res)=>{
          console.log('登录失败！' + res.errMsg)
        }
      }) 
    }
  }
})