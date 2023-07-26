// 引入高德地图API的JavaScript库
import {
  AMapWX
} from '../../../libs/amap-wx.130.js';
// 引入应用配置
import {
  Config
} from '../../../libs/config.js';
const app = getApp();
const myAmapFun = new AMapWX({
  key: Config.key // 设置应用密钥
});

Component({
  data: {
    CustomBar: app.globalData.CustomBar,
    // 地图相关  
    markersData: [], // 获取到的周边POI数据
    markers: [], // 地图上的标记点
    latitude: 0, // 当前位置的纬度
    longitude: 0, // 当前位置的经度
    textData: {}, // 标记点的信息    
    hasLocations: false, // 是否已经获取过周边 POI 数据
    // 滑动卡片相关
    modalName: null, // 模态框名称
    cardCur: 0,
    swiperCurrent: 0, // 当前卡片索引
    // 搜索地点相关
  },
  lifetimes: {
    attached() {
      this.startLocation();
    },
  },
  methods: {
    // 地图相关
    // 开始获取位置信息
    startLocation() {
      // 创建高德地图 API 实例
      var that = this;
      // 开始监听位置变化
      wx.startLocationUpdate({
        success() {
          wx.onLocationChange(function (res) {
            // 获取最新位置信息
            var latitude = res.latitude;  //返回纬度
            var longitude = res.longitude; //返回经度
            // 如果还没有获取过周边 POI 数据，或者重新点击了定位按钮
            if (!that.data.hasLocations || that.data.backToCurrentLocation) {
              // 调用高德地图 API 获取周边 POI 数据
              myAmapFun.getPoiAround({
                location: longitude + ',' + latitude, // 设置查询位置
                iconPathSelected: '../../../images/amap/marker_checked.png', //选中的图标路径
                iconPath: '../../../images/amap/marker.png', //未选中的图标
                success(data) {
                  // 回调成功
                  that.setData({
                    markersData: data.markers, // 存储获取到的周边POI数据
                    markers: data.markers, // 存储地图上的标记点
                    latitude: latitude, // 存储当前位置的纬度
                    longitude: longitude // 存储当前位置的经度
                  });
                  that.showMarkerInfo(data.markers, 0); // 显示第一个标记点的信息
                },
                fail(info) {
                  wx.showModal({
                    title: info.errMsg // 显示错误信息
                  })
                }
              })
            } else {
              that.setData({
                latitude: latitude,
                longitude: longitude,
              });
            }
          })
        },
        fail(info) {
          wx.showModal({
            title: info.errMsg // 显示错误信息
          })
        }
      })
    },
    // 点击定位按钮时触发的方法
    backToLocation() {
      
      // 将地图中心点移动到当前定位点位置并显示在地图正中间
      // myAmapFun.goto
      console.log("moveToLocation")
      this.startLocation();
      this.setData({
        cardCur: 0 // 重置卡片索引
      });
    },
    // 点击标记点时触发的事件处理函数
    makertap(e) {
      var index = e.markerId;
      this.showMarkerInfo(this.data.markersData, index); // 显示标记点的信息
      this.changeMarkerColor(this.data.markersData, index); // 改变标记点的颜色
      this.setData({
        cardCur: index, // 更新当前卡片索引
      });
    },
    // 显示标记点的信息
    showMarkerInfo(markers, index) {
      if (!markers || markers.length === 0 || index < 0 || index >= markers.length) {
        return;
      }
      this.setData({
        textData: {
          name: markers[index].name,
          desc: markers[index].address
        }
      });
    },
    // 改变标记点的颜色
    changeMarkerColor(markers, index) {
      var newMarkers = []
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
        markers: newMarkers, // 更新地图上的标记点
        cardCur: index // 更新当前卡片索引
      });
    },
    // 卡片相关
    cardSwiper(e) {
      this.setData({
        cardCur: e.detail.current
      })
      this.showMarkerInfo(this.data.markersData, e.detail.current); // 显示下一个标记点的信息
      this.changeMarkerColor(this.data.markersData, e.detail.current); // 改变下一个标记点的颜色
    }, // towerSwiper
    // 初始化towerSwiper
    towerSwiper(name) {
      let list = this.data[name] || [];
      // let list = this.data[name];
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
      console.log("swiperChange")
      if (!this.data.markersData || this.data.markersData.length === 0) {
        return;
      }
      if (e.detail.source == "touch" || e.detail.source == "autoplay") {
        this.setData({
          swiperCurrent: e.detail.current
        })
      }
      this.showMarkerInfo(this.data.markersData, e.detail.current); // 显示下一个标记点的信息
      this.changeMarkerColor(this.data.markersData, e.detail.current); // 改变下一个标记点的颜色
    },
    // 显示模态框
    showModal(e) {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    },
    // 隐藏模态框
    hideModal(e) {
      this.setData({
        modalName: null
      })
    },
  },
})