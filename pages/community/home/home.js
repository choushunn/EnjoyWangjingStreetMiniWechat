// pages/community/home/home.js
const app = getApp();
Component({
  data:{
    elements: [
      {
        title: '通知公告',
        color: 'olive',
        icon: 'notice',
        url: 'notice'
      },{
        title: '社区活动',
        color: 'green',
        icon: 'group',
        url: 'activity'
      },{
      title: '居民服务',
      name: 'work',
      color: 'cyan',
      icon: 'paint',
      url: 'work'
    },
    {
      title: '预约服务',
      name: 'appointment',
      color: 'red',
      icon: 'edit',
      url: 'appointment'
    },
    {
      title: '咨询服务',
      name: 'consult',
      color: 'orange',
      icon: 'comment',
      url: 'consult'
    },
    {
      title: '问题上报',
      name: 'report',
      color: 'yellow',
      icon: 'upload',
      url: 'report'
    },{
      title: '便民电话',
      name: 'phone',
      color: 'blue',
      icon: 'dianhua',
      url: 'phone'
    },
    {
      title: '意见反馈',
      name: 'feedback',
      color: 'mauve',
      icon: 'question',
      url: 'feedback'
    },
    {
      title: '近期新闻',
      name: 'feedback',
      color: 'mauve',
      icon: 'question',
      url: 'feedback'
    }
  ]
  },
  methods:{

  },
  lifetimes: {
    created: function () {
      var that = this;
      wx.request({
        url: app.globalData.apiUri + 'api/v1/system/menu_category/4/', // 后台接口地址
        method:"GET",
        success: function (res) {
          console.log("社区菜单请求成功：",res); // 打印后台返回的数据
          that.setData({
            elements: res.data.items // 将后台返回的数据绑定到页面的 elements 变量中
          });         
        },
      });
    },
  },
})