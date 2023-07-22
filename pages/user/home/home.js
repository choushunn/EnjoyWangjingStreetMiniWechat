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
    }],
    gridCol: 3,
    skin: false,
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
  },
  methods: {
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