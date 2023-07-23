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
        title: '其他费 ',
        name: 'icon',
        color: 'mauve',
        icon: 'post',
        url:'https://www.baidu.com'
      },
    ],
    elements1: [{
        title: '居民服务',
        name: 'layout',
        color: 'cyan',
        icon: 'newsfill',
        url:'https://www.baidu.com'
      },
      {
        title: '邻里空间',
        name: 'background',
        color: 'blue',
        icon: 'servicefill',
        url:'https://www.baidu.com'
      },
      {
        title: '公共事务 ',
        name: 'icon',
        color: 'mauve',
        icon: 'post',
        url:'https://www.baidu.com'
      },
      {
        title: '在线咨询 ',
        name: 'icon',
        color: 'pink',
        icon: 'post',
        url:'https://www.baidu.com'
      },
      {
        title: '预约服务 ',
        name: 'icon',
        color: 'brown',
        icon: 'post',
        url:'https://www.baidu.com'
      },
    ],
    elements2: [{
        title: '功能点',
        name: 'layout',
        color: 'red',
        icon: 'newsfill',
        url:'https://www.baidu.com'
      },
      {
        title: '功能点',
        name: 'background',
        color: 'orange',
        icon: 'servicefill',
        url:'https://www.baidu.com'
      },
      {
        title: '功能点',
        name: 'text',
        color: 'yellow',
        icon: 'group',
        url:'https://www.baidu.com'
      },
      {
        title: '功能点',
        name: 'icon',
        color: 'olive',
        icon: 'post',
        url:'https://www.baidu.com'
      },
      {
        title: '功能点',
        name: 'icon',
        color: 'green',
        icon: 'post',
        url:'https://www.baidu.com'
      },
      {
        title: '功能点',
        name: 'icon',
        color: 'cyan',
        icon: 'post',
        url:'https://www.baidu.com'
      },
      {
        title: '功能点',
        name: 'icon',
        color: 'blue',
        icon: 'post',
        url:'https://www.baidu.com'
      },
      {
        title: '功能点',
        name: 'icon',
        color: 'purple',
        icon: 'post',
        url:'https://www.baidu.com'
      },
      {
        title: '功能点',
        name: 'icon',
        color: 'mauve',
        icon: 'post',
        url:'https://www.baidu.com'
      }, {
        title: '功能点',
        name: 'icon',
        color: 'pink',
        icon: 'post',
        url:'https://www.baidu.com'
      }, {
        title: '功能点',
        name: 'icon',
        color: 'brown',
        icon: 'post',
        url:'https://www.baidu.com'
      }, {
        title: '功能点',
        name: 'icon',
        color: 'grey',
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