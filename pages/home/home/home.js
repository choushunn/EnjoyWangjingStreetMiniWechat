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
        title: '办事大厅',
        name: 'purple',
        color: 'orange',
        icon: 'servicefill',
        url:'/pages/service/home/home'
      },
      {
        title: '工单预约',
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

    }]
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
      // 执行页面跳转
      // wx.navigateTo({
      //     url: '/user/home/home'
      //   })
      wx.switchTab({
        url: '/pages/user/home/home'
      })
    }
  }
})