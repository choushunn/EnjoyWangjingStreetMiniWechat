// pages/service/home/home.js
const app = getApp();
Component({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    elements: [{
        title: '电费',
        name: 'layout',
        color: 'cyan',
        icon: 'newsfill',
        url:'https://www.baidu.com'
      },
      {
        title: '水费',
        name: 'background',
        color: 'blue',
        icon: 'servicefill',
        url:'https://www.baidu.com'
      },
      {
        title: '物业费',
        name: 'text',
        color: 'purple',
        icon: 'group',
        url:'https://www.baidu.com'
      },
      {
        title: '其他费 ',
        name: 'icon',
        color: 'mauve',
        icon: 'post',
        url:'https://www.baidu.com'
      },
    ],
    elements1: [{
        title: '办事指南',
        name: 'layout',
        color: 'cyan',
        icon: 'newsfill',
        url:'https://www.baidu.com'
      },
      {
        title: '办事大厅',
        name: 'background',
        color: 'blue',
        icon: 'servicefill',
        url:'https://www.baidu.com'
      },
      {
        title: '政民互动',
        name: 'text',
        color: 'purple',
        icon: 'group',
        url:'https://www.baidu.com'
      },
      {
        title: '预约服务 ',
        name: 'icon',
        color: 'mauve',
        icon: 'post',
        url:'https://www.baidu.com'
      },
      {
        title: '预约服务 ',
        name: 'icon',
        color: 'mauve',
        icon: 'post',
        url:'https://www.baidu.com'
      },
      {
        title: '预约服务 ',
        name: 'icon',
        color: 'mauve',
        icon: 'post',
        url:'https://www.baidu.com'
      },
    ],
    elements2: [{
        title: '办事指南',
        name: 'layout',
        color: 'cyan',
        icon: 'newsfill',
        url:'https://www.baidu.com'
      },
      {
        title: '办事大厅',
        name: 'background',
        color: 'blue',
        icon: 'servicefill',
        url:'https://www.baidu.com'
      },
      {
        title: '政民互动',
        name: 'text',
        color: 'purple',
        icon: 'group',
        url:'https://www.baidu.com'
      },
      {
        title: '预约服务 ',
        name: 'icon',
        color: 'mauve',
        icon: 'post',
        url:'https://www.baidu.com'
      },
      {
        title: '预约服务 ',
        name: 'icon',
        color: 'mauve',
        icon: 'post',
        url:'https://www.baidu.com'
      },
      {
        title: '预约服务 ',
        name: 'icon',
        color: 'mauve',
        icon: 'post',
        url:'https://www.baidu.com'
      },
      {
        title: '预约服务 ',
        name: 'icon',
        color: 'mauve',
        icon: 'post',
        url:'https://www.baidu.com'
      },
      {
        title: '预约服务 ',
        name: 'icon',
        color: 'mauve',
        icon: 'post',
        url:'https://www.baidu.com'
      },
      {
        title: '预约服务 ',
        name: 'icon',
        color: 'mauve',
        icon: 'post',
        url:'https://www.baidu.com'
      },
    ]
  },
  methods: {
    searchIcon(e) {
      console.log("搜索。。。。。")
    },
  }
})