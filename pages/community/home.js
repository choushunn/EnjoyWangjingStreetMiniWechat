// pages/community/home/home.js
const app = getApp();
Component({
  data: {
    elements: [{
      name: '通知公告',
      color: 'olive',
      icon: 'notice',
      url: '/pages/community/notice/notice'
    }, {
      name: '社区活动',
      color: 'green',
      icon: 'group',
      url: '/pages/community/activity/activity'
    }, {
      name: '居民服务',
      color: 'cyan',
      icon: 'paint',
      url: '/pages/community/work/work'
    }, {
      name: '预约服务',
      color: 'red',
      icon: 'edit',
      url: '/pages/community/appointment/appointment'
    }, {
      name: '咨询服务',
      color: 'orange',
      icon: 'comment',
      url: '/pages/community/consult/consult'
    }, {
      name: '问题上报',
      color: 'yellow',
      icon: 'upload',
      url: '/pages/community/report/report'
    }, {
      name: '便民电话',
      color: 'blue',
      icon: 'dianhua',
      url: '/pages/community/phone/phone'
    }, {
      name: '意见反馈',
      color: 'mauve',
      icon: 'question',
      url: '/pages/community/feedback/feedback'
    }, {
      name: '近期新闻',
      color: 'blue',
      icon: 'news',
      url: '/pages/home/news'
    }]
  },
  methods: {
    // 跳转到功能页面
    toPage(e) {
      var url = e.currentTarget.dataset.url
      wx.navigateTo({
        url: url
      })
    },
  },
  lifetimes: {
    created: function () {
      var that = this;
      // 获取后台菜单数据
      wx.request({
        url: app.globalData.apiUri + 'menu_category/?url=community',
        method: "GET",
        success: function (res) {
          console.log("社区菜单请求成功：", res);
          console.log(res.data[0].items)
          var menu_items = res.data[0]
          if (menu_items.length>0) {
            that.setData({
              elements: menu_items.items
            });
          }
        },
        fail: function (res) {
          console.log("社区菜单请求失败：", res)
        }
      });
    },
  },
})