// pages/service/home/home.js
const app = getApp();
Component({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    elements: [{
        title: '办事指南',
        name: 'layout',
        color: 'cyan',
        icon: 'newsfill'
      },
      {
        title: '办事大厅',
        name: 'background',
        color: 'blue',
        icon: 'servicefill'
      },
      {
        title: '政民互动',
        name: 'text',
        color: 'purple',
        icon: 'group'
      },
      {
        title: '预约服务 ',
        name: 'icon',
        color: 'mauve',
        icon: 'post'
      },
    ],
    elements2: [{
        title: '便民电话',
        color: 'cyan',
        icon: 'dianhua'
      },
      {
        title: '社区公示',
        name: 'background',
        color: 'blue',
        icon: 'calendar'
      },
      {
        title: '知识科普',
        name: 'text',
        color: 'purple',
        icon: 'read'
      },
    ],
    elements3: [{
        title: '电费',
        color: 'white',
        icon: 'text'
      },
      {
        title: '水费',
        color: 'white',
        icon: 'upload'
      },
      {
        title: '物业费',
        color: 'white',
        icon: 'upload'
      },
    ],
  },
  methods: {
    isCard(e) {
      this.setData({
        isCard: e.detail.value
      })
    },
    searchIcon(e) {
      console.log("搜索。。。。。")
    },
  }
})