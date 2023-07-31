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
      name: 'repair',
      color: 'cyan',
      icon: 'paint',
      url: 'repair'
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
    }
  ]
  },
  methods:{

  }
})