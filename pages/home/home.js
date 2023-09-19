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
        name: '居民公约',
        color: 'red',
        icon: 'newsfill',
        url: '/pages/home/guideline'
      },
      {
        name: '社区新闻',
        color: 'orange',
        icon: 'servicefill',
        url: '/pages/home/news'
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
    }],
    newsList: null
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
          if(res.data[0].items.length>0){
          that.setData({
            elements: res.data[0].items // 将后台返回的数据绑定到页面的 elements 变量中
          });
        }
        },
      });
      // 请求首页新闻数据
      wx.request({
        url: app.globalData.apiUri + 'news/', // 后台接口地址
        method: "GET",
        success: function (res) {
          console.log("新闻请求成功：", res.data); // 打印后台返回的数据
          if (res.data.length > 0) {
            that.setData({
              newsList: res.data // 将后台返回的数据绑定到页面的 newsList 变量中
            });
          } else {
            console.log("新闻返回数据为空")
          }
        },
      });
    },
    ready: function () {
      // this.setData({
      //   modalName: 'Image'
      // })
      // var that = this
      // setTimeout(function () {
      //   that.setData({
      //     modalName: null
      //   })
      // }, 4000);
    }
  },
  methods: {
    // 跳转功能页面
    toPage(e) {
      var url = e.currentTarget.dataset.url
      wx.navigateTo({
        url: url
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
    agree(e) {
      console.log("用户同意隐私授权, 接下来可以调用隐私协议中声明的隐私接口")
      wx.getClipboardData({
        success(res) {
          console.log("getClipboardData success", res)
        },
        fail(res) {
          console.log("getClipboardData fail", res)
        },
      })
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