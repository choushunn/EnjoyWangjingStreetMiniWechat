// pages/community/home/home.js
const app = getApp();
Component({
  data:{
    elements: [
      {
        title: '社区通知',
        name: 'notice',
        color: 'olive',
        icon: 'notice',
        url: 'notice'
      },{
        title: '社区活动',
        name: 'activity',
        color: 'green',
        icon: 'group',
        url: 'activity'
      },{
      title: '居民报修',
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
      title: '信息上报',
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
      title: '投诉公示',
      name: 'complaint',
      color: 'purple',
      icon: 'newshot',
      url: 'complaint'
    },
    {
      title: '反馈意见',
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