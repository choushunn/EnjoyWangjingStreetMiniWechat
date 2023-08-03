// pages/basics/home/home.js
const app = getApp();

Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    TabCur: 0,
    scrollLeft: 0,
    elements: [{
        name: '办事指南',
        color: 'red',
        icon: 'newsfill',
        url: '/pages/community/phone/phone'
      },
      {
        name: '社区活动',
        color: 'orange',
        icon: 'servicefill',
        url: '/pages/community/activity/activity'
      },
      {
        name: '居民服务',
        color: 'green',
        icon: 'group',
        url: '/pages/community/work/work'
      },
      {
        name: '预约服务',
        color: 'pink',
        icon: 'post',
        url: '/pages/community/appointment/appointment'
      },
    ],
    swiperList: [{
      type: 'image',
      image: 'https://img1.qunarzz.com/travel/poi/201403/28/daab198c5029a423ddb12cfb.jpg_r_720x400x95_0c4e4c13.jpg',
      description: ''
    }],
    // newsData: [{

    // }],
    newsData: null
  },
  lifetimes: {
    created: function () {
      var that = this;
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
      wx.request({
        url: app.globalData.apiUri + 'menu_category/3/', // 后台接口地址
        method: "GET",
        success: function (res) {
          console.log("菜单请求成功：", res); // 打印后台返回的数据
          that.setData({
            elements: res.data.items // 将后台返回的数据绑定到页面的 elements 变量中
          });
        },
      });
      wx.request({
        url: app.globalData.apiUri + 'news/', // 后台接口地址
        method: "GET",
        success: function (res) {
          console.log("新闻请求成功：", res.data); // 打印后台返回的数据
          if (res.data.length > 0) {
            that.setData({
              newsData: res.data // 将后台返回的数据绑定到页面的 newsData 变量中
            });
          } else {
            console.log("新闻返回数据为空")
          }
        },
      });
    },
  },
  methods: {
    // 跳转功能页面
    toPage(e) {
      var url = e.currentTarget.dataset.url
      wx.navigateTo({
        url: url
      })
    },
    // 跳转到详情页面
    toDetail(e) {
      console.log(e)
      var id = e.currentTarget.dataset.item.id
      var item = JSON.stringify(e.currentTarget.dataset.item)
      // 跳转到详情页面
      wx.navigateTo({
        url: '/pages/home/news/detail?id=' + id + '&item=' + item,
      })
    },
    tabSelect(e) {
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        scrollLeft: (e.currentTarget.dataset.id - 1) * 60
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