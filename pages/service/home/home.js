// pages/service/home/home.js
const app = getApp();
Component({
  data: {
    CustomBar: app.globalData.CustomBar,
    data1:[{
      title: '电费',
      name: '电费',
      color: 'cyan',
      icon: 'card',
      url: '',
      appid:'wx5899bdb8721621d6',
    },{
      title: '水费',
      name: '水费',
      color: 'red',
      icon: 'card',
      url: '',
      appid:'wxd2ade0f25a874ee2',
    },{
      title: '生活缴费',
      name: '生活缴费',
      color: 'orange',
      icon: 'card',
      url: '',
      appid:'wxd2ade0f25a874ee2',
    },{
      title: '政务服务',
      name: '政务服务',
      color: 'blue',
      icon: 'card',
      url: '',
      appid:'wx2eec5fb00157a603',
    }],
    categories: [{
        "title": "社区服务",
        "iconColor": "blue",
   
        elements: [{
            title: '邻里空间',
            name: 'background',
            color: 'blue',
            icon: 'wefill',
            url: '/pages/community/appointment/roomform'
          },
          {
            title: '在线咨询 ',
            name: 'icon',
            color: 'pink',
            icon: 'post',
            url: '/pages/community/consult/consult'
          },
          {
            title: '意见反馈 ',
            name: 'icon',
            color: 'brown',
            icon: 'copy',
            url: '/pages/community/feedback/feedback'
          },
        ],
      },
      {
        "title": "便民服务",
        "iconColor": "green",
        elements: [{
            title: '便民电话',
            name: 'layout',
            color: 'red',
            icon: 'newsfill',
            url: '/pages/community/phone/phone'
          },
          {
            title: '信息填报',
            name: 'background',
            color: 'orange',
            icon: 'peoplefill',
            url: '/pages/community/report/report'
          },
          {
            title: '咨询服务',
            name: 'text',
            color: 'yellow',
            icon: 'group',
            url: '/pages/community/consult/consult'
          },
          {
            title: '预约服务',
            name: 'icon',
            color: 'olive',
            icon: 'dianhua',
            url: '/pages/community/appointment/appointment'
          },
          {
            title: '居民服务',
            name: 'icon',
            color: 'green',
            icon: 'sound',
            url: '/pages/community/work/work'
          },
          {
            title: '社区活动',
            name: 'icon',
            color: 'cyan',
            icon: 'group',
            url: '/pages/community/activity/activity'
          },
          {
            title: '社区通知',
            name: 'icon',
            color: 'blue',
            icon: 'emojifill',
            url: '/pages/community/notice/notice'
          },
          {
            title: '我的收藏',
            name: 'icon',
            color: 'purple',
            icon: 'file',
            url: '/pages/user/myfaver/myfaver'
          },
          {
            title: '我的消息',
            name: 'icon',
            color: 'mauve',
            icon: 'mark',
            url: '/pages/user/mymessage/mymessage'
          }, {
            title: '我的工单',
            name: 'icon',
            color: 'pink',
            icon: 'tagfill',
            url: '/pages/user/myorder/myorder'
          }, {
            title: '我的反馈',
            name: 'icon',
            color: 'brown',
            icon: 'write',
            url: '/pages/user/myfeedback/myfeedback'
          }, {
            title: '我的预约',
            name: 'icon',
            color: 'olive',
            icon: 'evaluate_fill',
            url: '/pages/user/myappointment/myappointment'
          },
        ]
      }
    ]
  },
  lifetimes: {
    created() {
      // 加载菜单项
      console.log()
    }
  },
  methods: {
    toMini(e) {
      console.log(e)
      var appId = e.currentTarget.dataset.appid
      wx.navigateToMiniProgram({
        appId: appId,
        path: '',
        envVersion: 'release',
        success(res) {
          // 打开成功
        }
      })
    },
    searchIcon(e) {
      console.log("搜索....")
    },
    toPage(e) {
      var url = e.currentTarget.dataset.url
      wx.navigateTo({
        url: url
      })
    }
  }
})