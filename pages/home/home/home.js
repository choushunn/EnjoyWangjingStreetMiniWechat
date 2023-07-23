// pages/basics/home/home.js
const app = getApp();
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    ColorList: app.globalData.ColorList,
    TabCur: 0,
    scrollLeft: 0,
    elements: [{
        title: '办事指南',
        name: 'red',
        color: 'red',
        icon: 'newsfill',
        url:'/pages/community/phone/phone'
      },
      {
        title: '社区活动',
        name: 'purple',
        color: 'orange',
        icon: 'servicefill',
        url:'/pages/community/activity/activity'
      },
      {
        title: '居民服务',
        name: 'interaction',
        color: 'green',
        icon: 'group',
        url:'/pages/community/repair/repair'
      },
      {
        title: '预约服务 ',
        name: 'appointment',
        color: 'pink',
        icon: 'post',
        url:'/pages/community/appointment/appointment'
      },
    ],
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://img1.qunarzz.com/travel/poi/201403/28/daab198c5029a423ddb12cfb.jpg_r_720x400x95_0c4e4c13.jpg'
    }, {
      id: 1,
      type: 'image',
      url: 'https://youimg1.c-ctrip.com/target/100i10000000o9w0fE878.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://image.scol.com.cn/data/attachment/forum/202002/25/1582633049799.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://image.scol.com.cn/data/attachment/forum/202105/25/1621945509990.jpg'
    }],
    newsData: [{

    }],
    "newsData": [
      {
        "id": 1,
        "title": "社区活动1",
        "imgUrl": "https://img1.qunarzz.com/travel/poi/201403/28/daab198c5029a423ddb12cfb.jpg_r_720x400x95_0c4e4c13.jpg",
        "desc": "创建和谐社区，共建美好家园。创建文明和谐社区，共建温馨美好的家园！",
        "type": "活动",
        "datetime": "2023年5月26日",
        "tags": [
          { "name": "党组织生活", "color": "bg-red" },
          { "name": "活动", "color": "bg-green" }
        ]
      },
      {
        "id": 2,
        "title": "社区活动2",
        "imgUrl": "https://youimg1.c-ctrip.com/target/100i10000000o9w0fE878.jpg",
        "desc": "普及志愿服务理念 促进和谐社区建设，创展文明社区，建美好家园。",
        "type": "活动",
        "datetime": "2023年5月26日",
        "tags": [
          { "name": "党组织生活", "color": "bg-red" },
          { "name": "活动", "color": "bg-green" }
        ]
      },
      {
        "id": 3,
        "title": "社区活动3",
        "imgUrl": "https://image.scol.com.cn/data/attachment/forum/202002/25/1582633049799.jpg",
        "desc": "折互帮互助好邻里，互敬互爱好家庭。打造平安大院，构建和谐社会。",
        "type": "活动",
        "datetime": "2023年5月26日",
        "tags": [
          { "name": "党组织生活", "color": "bg-red" },
          { "name": "活动", "color": "bg-green" }
        ]
      }
    ]
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