// pages/basics/home/home.js
var formatTime = require('../../../utils/utils.js');

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
        url: '/pages/community/repair/repair'
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
      description:''
    }],
    // newsData: [{

    // }],
    newsData: [{
        id: 1,
        "title": "社区活动1",
        "image": "https://img1.qunarzz.com/travel/poi/201403/28/daab198c5029a423ddb12cfb.jpg_r_720x400x95_0c4e4c13.jpg",
        "summary": "创建和谐社区，共建美好家园。创建文明和谐社区，共建温馨美好的家园！",
        "type": "活动",
        "datetime": "2023年5月26日",
        "tags": [{
            "name": "党组织生活",
            "color": "bg-red"
          },
          {
            "name": "活动",
            "color": "bg-green"
          }
        ]
      },
      {
        id: 2,
        "title": "社区活动2",
        "imgUrl": "https://youimg1.c-ctrip.com/target/100i10000000o9w0fE878.jpg",
        "desc": "普及志愿服务理念 促进和谐社区建设，创展文明社区，建美好家园。",
        "type": "活动",
        "datetime": "2023年5月26日",
        "tags": [{
            "name": "党组织生活",
            "color": "bg-red"
          },
          {
            "name": "活动",
            "color": "bg-green"
          }
        ]
      },
      {
        id: 3,
        "title": "社区活动3",
        "imgUrl": "https://image.scol.com.cn/data/attachment/forum/202002/25/1582633049799.jpg",
        "desc": "折互帮互助好邻里，互敬互爱好家庭。打造平安大院，构建和谐社会。",
        "type": "活动",
        "datetime": "2023年5月26日",
        "tags": [{
            "name": "党组织生活",
            "color": "bg-red"
          },
          {
            "name": "活动",
            "color": "bg-green"
          }
        ]
      }
    ]
  },
  lifetimes: {
    created: function () {
      var that = this;
      wx.request({
        url: app.globalData.apiUri + 'api/v1/system/carousel/', // 后台接口地址
        method:"GET",
        success: function (res) {
          console.log("轮播图请求成功：",res.data); // 打印后台返回的数据
          that.setData({
            swiperList: res.data // 将后台返回的数据绑定到页面的 swiperList 变量中
          });         
        },
      });
      wx.request({
        url: app.globalData.apiUri + 'api/v1/system/menu_category/3/', // 后台接口地址
        method:"GET",
        success: function (res) {
          console.log("菜单请求成功：",res); // 打印后台返回的数据
          that.setData({
            elements: res.data.items // 将后台返回的数据绑定到页面的 elements 变量中
          });         
        },
      });
      wx.request({
        url: app.globalData.apiUri + 'api/v1/community/news/', // 后台接口地址
        method:"GET",
        success: function (res) {
          console.log("新闻请求成功：",res.data); // 打印后台返回的数据
          var date = new Date(res.data[0].created_at);
          var formattedTime = formatTime(date);
          // 格式化时间为指定格式（例如：2023-07-29 20:18:41）
          var formattedTime = date.toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai', hour12: false }).replace(/\//g, '-');
          res.data[0].created_at = formattedTime;
          that.setData({
            newsData: res.data // 将后台返回的数据绑定到页面的 newsData 变量中
          });         
        },
      });
    },
    


   
  },
  
  methods: {
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