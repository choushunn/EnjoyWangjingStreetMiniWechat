// pages/about/home/home.js
import {
  AMapWX
} from '../../../libs/amap-wx.130.js';
import {
  Config
} from '../../../libs/config.js';

Component({
  data: {
    markersData: [],
    markers: [],
    latitude: '',
    longitude: '',
    textData: {}
  },
  created: function () {
    var that = this;
    var myAmapFun = new AMapWX({
      key: Config.key
    });

    wx.startLocationUpdate({
      success: function () {
        wx.onLocationChange(function (res) {
          // 获取最新的位置信息
          var latitude = res.latitude;
          var longitude = res.longitude;

          // 调用高德地图 API 获取周边 POI 数据
          myAmapFun.getPoiAround({
            location: longitude + ',' + latitude,
            success: function (data) {
              that.setData({
                markersData: data.markers,
                markers: data.markers,
                latitude: latitude,
                longitude: longitude
              });
              that.showMarkerInfo(data.markers, 0);
            },
            fail: function (info) {
              wx.showModal({
                title: info.errMsg
              })
            }
          })
        })
      },
      fail: function (info) {
        wx.showModal({
          title: info.errMsg
        })
      }
    })
  },
  methods: {
    makertap: function (e) {
      var index = e.markerId;
      this.showMarkerInfo(this.data.markersData, index);
      this.changeMarkerColor(this.data.markersData, index);
    },
    showMarkerInfo: function (markers, index) {
      this.setData({
        textData: {
          name: markers[index].name,
          desc: markers[index].address
        }
      });
    },
    changeMarkerColor: function (markers, index) {
      var newMarkers = [];
      for (var i = 0; i < markers.length; i++) {
        var marker = markers[i];
        if (i == index) {
          // marker.iconPath = "选中 marker 图标的相对路径"; //如：..­/..­/img/marker_checked.png
        } else {
          // marker.iconPath = "未选中 marker 图标的相对路径"; //如：..­/..­/img/marker.png
        }
        // newMarkers.push(marker);
      }
      this.setData({
        markers: newMarkers
      });
    }
  }
})