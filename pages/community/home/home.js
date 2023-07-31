// pages/community/home/home.js
const app = getApp();
Component({
  data:{
    elements: [
      {
        title: '通知公告',
        color: 'olive',
        icon: 'notice',
        url: '/pages/community/notice/notice'
      },{
        title: '社区活动',
        color: 'green',
        icon: 'group',
        url: '/pages/community/activity/activity'
      },{
      title: '居民服务',
      name: 'work',
      color: 'cyan',
      icon: 'paint',
      url: '/pages/community/work/work'
    },
    {
      title: '预约服务',
      name: 'appointment',
      color: 'red',
      icon: 'edit',
      url: '/pages/community/appointment/appointment'
    },
    {
      title: '咨询服务',
      name: 'consult',
      color: 'orange',
      icon: 'comment',
      url: '/pages/community/consult/consult'
    },
    {
      title: '问题上报',
      name: 'report',
      color: 'yellow',
      icon: 'upload',
      url: '/pages/community/report/report'
    },{
      title: '便民电话',
      name: 'phone',
      color: 'blue',
      icon: 'dianhua',
      url: '/pages/community/phone/phone'
    },
    {
      title: '意见反馈',
      name: 'feedback',
      color: 'mauve',
      icon: 'question',
      url: '/pages/community/feedback/feedback'
    },
    {
      title: '近期新闻',
      name: 'feedback',
      color: 'mauve',
      icon: 'question',
      url: '/pages/home/news/news'
    }
  ]
  },
  methods:{

  }
})