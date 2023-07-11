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
      name: '常用功能'
    }, {
      icon: 'recordfill',
      color: 'orange',
      badge: 1,
      name: '我的收藏'
    }, {
      icon: 'picfill',
      color: 'yellow',
      badge: 10,
      name: '我的消息'
    }, {
      icon: 'noticefill',
      color: 'olive',
      badge: 22,
      name: '我的工单'
    }, {
      icon: 'upstagefill',
      color: 'cyan',
      badge: 0,
      name: '我的反馈'
    }, {
      icon: 'clothesfill',
      color: 'blue',
      badge: 0,
      name: '我的预约'
    }],
    gridCol: 3,
    skin: false
  },
})