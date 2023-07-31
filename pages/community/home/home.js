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
      url: '/pages/home/news/news'
    }]
  },
  methods: {
    // 跳转到功能页面
    toPage(e){
      var url = e.currentTarget.dataset.url
      wx.navigateTo({
        url: url
      })
    },
  },
  lifetimes: {
    created: function () {
      var that = this;
      wx.request({
        url: app.globalData.apiUri + 'api/v1/system/menu_category/4/', // 后台接口地址
        method: "GET",
        success: function (res) {
          console.log("社区菜单请求成功：", res); // 打印后台返回的数据
          that.setData({
            elements: res.data.items // 将后台返回的数据绑定到页面的 elements 变量中
          });
        },
      });
    },
  },
})