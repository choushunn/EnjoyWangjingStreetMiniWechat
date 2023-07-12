// 引入高德地图API的JavaScript库
import {
  AMapWX
} from '../../../libs/amap-wx.130.js';
// 引入应用配置
import {
  Config
} from '../../../libs/config.js';

const app = getApp();

Component({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    markersData: [], // 存储获取到的周边POI数据
    markers: [], // 存储地图上的标记点
    latitude: '', // 当前位置的纬度
    longitude: '', // 当前位置的经度
    textData: {}, // 显示标记点信息的数据
    dataAddress: [{
        name: '地点1',
        desc: '描述1',
        distance: 1.2
      },
      {
        name: '地点2',
        desc: '描述2',
        distance: 2.5
      },
      {
        name: '地点3',
        desc: '描述3',
        distance: 3.8
      },
      {
        name: '地点4',
        desc: '描述4',
        distance: 4.1
      },
      {
        name: '地点5',
        desc: '描述5',
        distance: 5.3
      }
    ]
  },
  created: function () {
    this.startLocation();
  },
  methods: {
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
  }
})
