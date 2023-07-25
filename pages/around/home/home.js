// 引入高德地图API的JavaScript库
import {
  AMapWX
} from '../../../libs/amap-wx.130.js';
// 引入应用配置
import {
  Config
} from '../../../libs/config.js';

const app = getApp();
var amapFile = require('../../../libs/amap-wx.130.js');
Component({
  data: {
    inputText:'',
    result:[],
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    markersData: [], // 存储获取到的周边POI数据
    markers: [], // 存储地图上的标记点
    latitude: '', // 当前位置的纬度
    longitude: '', // 当前位置的经度
    textData: {}, // 显示标记点信息的数据
    hot_list: ['服务', '出行', '设施','学校','餐饮'],
    area_list: ['所有','100m','200m'],
    list: [],
    tips:[],   
    cardCur: 0,
    swiperCurrent:0,
    dataAddress: [{
      name: '维也纳国际酒店',
      address: '重庆市两江新区龙兴镇普福大道481号',
      distance: '距离当前位置678米',
      phone: '023-890058888'
      },
      {
        name: '维也纳国际酒店',
        address: '重庆市两江新区龙兴镇普福大道481号',
        distance: '距离当前位置678米',
        phone: '023-890058888'
      },
      {
        name: '维也纳国际酒店',
        address: '重庆市两江新区龙兴镇普福大道481号',
        distance: '距离当前位置678米',
        phone: '023-890058888'
      },
      {
        name: '维也纳国际酒店',
        address: '重庆市两江新区龙兴镇普福大道481号',
        distance: '距离当前位置678米',
        phone: '023-890058888'
      },
      {
        name: '维也纳国际酒店',
        address: '重庆市两江新区龙兴镇普福大道481号',
        distance: '距离当前位置678米',
        phone: '023-890058888'
      }
    ]
  }, 
  created: function () {
    this.startLocation();
  },
  methods: {
    cardSwiper(e) {
      this.setData({
        cardCur: e.detail.current
      })
    },  // towerSwiper
    // 初始化towerSwiper
    towerSwiper(name) {
      let list = this.data[name];
      for (let i = 0; i < list.length; i++) {
        list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
        list[i].mLeft = i - parseInt(list.length / 2)
      }
      this.setData({
        swiperList: list
      })
    },
    // towerSwiper触摸开始
    towerStart(e) {
      this.setData({
        towerStart: e.touches[0].pageX
      })
    },
    // towerSwiper计算方向
    towerMove(e) {
      this.setData({
        direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
      })
    },
    // towerSwiper计算滚动
    towerEnd(e) {
      let direction = this.data.direction;
      let list = this.data.swiperList;
      if (direction == 'right') {
        let mLeft = list[0].mLeft;
        let zIndex = list[0].zIndex;
        for (let i = 1; i < list.length; i++) {
          list[i - 1].mLeft = list[i].mLeft
          list[i - 1].zIndex = list[i].zIndex
        }
        list[list.length - 1].mLeft = mLeft;
        list[list.length - 1].zIndex = zIndex;
        this.setData({
          swiperList: list
        })
      } else {
        let mLeft = list[list.length - 1].mLeft;
        let zIndex = list[list.length - 1].zIndex;
        for (let i = list.length - 1; i > 0; i--) {
          list[i].mLeft = list[i - 1].mLeft
          list[i].zIndex = list[i - 1].zIndex
        }
        list[0].mLeft = mLeft;
        list[0].zIndex = zIndex;
        this.setData({
          swiperList: list
        })
      }
    },
    swiperChange(e) {
      if (e.detail.source == "touch" || e.detail.source == "autoplay") {
        this.setData({
          swiperCurrent: e.detail.current
        })
      }
    },
 
    startLocation: function () {
      var that = this;
      // 创建高德地图 API 实例
      var myAmapFun = new AMapWX({
        key: Config.key // 设置应用密钥
      });
      // 开始监听位置变化
      wx.startLocationUpdate({
        success: function () {
          wx.onLocationChange(function (res) {
            // 获取最新位置信息
            var latitude = res.latitude;
            var longitude = res.longitude;
            // 调用高德地图 API 获取周边 POI 数据
            myAmapFun.getPoiAround({
              location: longitude + ',' + latitude, // 设置查询位置
              iconPathSelected: '../../../images/amap/marker_checked.png', //如：..­/..­/img/marker_checked.png
              iconPath: '../../../images/amap/marker.png', //如：..­/..­/img/marker.png
              success: function (data) {
                that.setData({
                  markersData: data.markers, // 存储获取到的周边POI数据
                  markers: data.markers, // 存储地图上的标记点
                  latitude: latitude, // 存储当前位置的纬度
                  longitude: longitude // 存储当前位置的经度
                });
                that.showMarkerInfo(data.markers, 0); // 显示第一个标记点的信息
              },
              fail: function (info) {
                wx.showModal({
                  title: info.errMsg // 显示错误信息
                })
              }
            })
          })
        },
        fail: function (info) {
          wx.showModal({
            title: info.errMsg // 显示错误信息
          })
        }
      })
    },
    backToLocation: function() {
      console.log("返回当前地址")// 将地图中心移动到当前定位点的位置
      const myMap = wx.createMapContext('myMap');
      myMap.moveToLocation();
    },
    showModal(e) {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    },
    hideModal(e) {
      this.setData({
        modalName: null
      })
    },
    // 点击标记点时触发的事件处理函数
    makertap: function (e) {
      var index = e.markerId;
      this.showMarkerInfo(this.data.markersData, index); // 显示标记点的信息
      this.changeMarkerColor(this.data.markersData, index); // 改变标记点的颜色
    },
    // 显示标记点的信息
    showMarkerInfo: function (markers, index) {
      this.setData({
        textData: {
          name: markers[index].name,
          desc: markers[index].address
        }
      });
    },
    // 改变标记点的颜色
    changeMarkerColor: function (markers, index) {
      var newMarkers = [];
      for (var i = 0; i < markers.length; i++) {
        var marker = markers[i];
        if (i == index) {
          // 如果是选中的标记点，改变其图标颜色
          marker.iconPath = "../../../images/amap/marker_checked.png"; //如：..­/..­/img/marker_checked.png
        } else {
          // 如果是未选中的标记点，恢复其默认图标颜色
          marker.iconPath = "../../../images/amap/marker.png"; //如：..­/..­/img/marker.png
        }
        newMarkers.push(marker);
      }
      this.setData({
        markers: newMarkers // 更新地图上的标记点
      });
    }
  },
  bindInput: function(e){
    var that = this;
    var keywords = e.detail.value; 
    var key = config.Config.key;
    var myAmapFun = new AMapWX({
      key: Config.key // 设置应用密钥
    });
    myAmapFun.getInputtips({
      keywords: keywords,
      location: '',
      success: function(data){
        if(data && data.tips){
          that.setData({
            tips: data.tips
          });
        }
      }
    })
  },
  bindSearch: function(e){
    var keywords = e.target.dataset.keywords;
    var url = '../poi/poi?keywords=' + keywords;
    console.log(url)
    wx.redirectTo({
      url: url
    })
  },
  getSelecte: function(event) {
    const content = event.currentTarget.dataset.content
    this.setData({
      selected: content
    })
  },
  
  
  
})
