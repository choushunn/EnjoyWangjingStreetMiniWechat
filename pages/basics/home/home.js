// pages/basics/home/home.js
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
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
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
    }],
  },

})