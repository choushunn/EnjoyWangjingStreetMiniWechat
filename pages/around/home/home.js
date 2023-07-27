import QQMapWX from '../../../libs/qqmap-wx-jssdk.min';
// 实例化API核心类
var qqmapsdk;
const app = getApp();
Component({
  data: {
    // 获取导航栏高度
    CustomBar: app.globalData.CustomBar,
    // 地图相关  
    markersData: [], // 获取到的周边POI数据
    markers: [], // 地图上的标记点
    longitude: 0, // 当前位置的经度
    currentTextData: {}, // 当前定位点的信息    
    hasLocations: false, // 是否已经获取过周边 POI 数据
    backToCurrentLocation: false,
    // 滑动卡片相关
    modalName: null, // 模态框名称
    cardCur: 0,
    swiperCurrent: 0, // 当前卡片索引
    // 搜索地点相关
    hot_list: ["餐饮", "学校", "商店", "其他"],
    area_list: ["全部", "100米", "200米", "500米"]
  },
  lifetimes: {
    created: function () {
      // 获取地图上下文对象
      this.mapCtx = wx.createMapContext('myMap', this)
      // 开始获取位置信息
      this.startLocation()
    }
  },
  methods: {
    // 地图相关
    startLocation() {
      var that = this;
      // 实例化API核心类
      qqmapsdk = new QQMapWX({
        key: 'NXOBZ-I3XHI-2L2GT-U2T6N-4QBDZ-ZKFAS'
      });
      // 开始监听位置变化
      wx.startLocationUpdate({
        success: () => {
          // 监听位置变化
          wx.onLocationChange(function (res) {
            // 获取最新位置信息
            var latitude = res.latitude; //返回纬度
            var longitude = res.longitude; //返回经度
            that.setData({
              latitude: latitude, // 存储当前位置的纬度
              longitude: longitude, // 存储当前位置的经度
              currentTextData: {
                latitude,
                longitude,
              },
            })
            // 如果还没有获取过周边 POI 数据，或者重新点击了定位按钮
            if (!that.data.hasLocations || that.data.backToCurrentLocation) {
              qqmapsdk.search({
                keyword: '餐饮',
                success: that.searchSuccess.bind(that),
                fail: that.searchFail.bind(that),
                complete: function (res) {
                  console.log(res);
                }
              });
            }
          })
        },
        fail: (info) => {
          // 显示错误信息
          wx.showModal({
            title: info.errMsg
          })
        }
      })
    },
    searchSuccess: function (res) {
      console.log(res.data);
      var data = res.data
      var markers = data.map(function (item,index) {
        return {
          id: index,
          latitude: item.location.lat,
          longitude: item.location.lng,
          title: item.title,
          address: item.address,
          iconPath: '../../../images/amap/marker.png', //选中的图标路径
          width: 20,
          height: 30,
          callout: {
            content: item.title + '\n' + item.address,
            color: '#000000',
            fontSize: 12,
            borderRadius: 10,
            bgColor: '#ffffff',
            padding: 10,
            display: 'BYCLICK'
          }
        };
      });
      // 回调成功
      this.setData({
        backToCurrentLocation: false,
        hasLocations: true,
        markersData: data, // 存储获取到的周边POI数据
        markers: markers, // 存储地图上的标记点
      });
    },
    // 搜索失败回调函数
    searchFail: function (res) {
      console.log(res);
    },
    // 点击定位按钮时触发的方法
    backToLocation() {
      // 将地图中心点移动到当前定位点位置并显示在地图正中间
      // myAmapFun.goto
      console.log("moveToLocation")
      this.startLocation();
      this.setData({
        backToCurrentLocation: true,
        cardCur: 0, // 重置卡片索引
        longitude: this.data.markers[this.data.cardCur].longitude,
        latitude: this.data.markers[this.data.cardCur].latitude,
      });
    },
    // 点击标记点时触发的事件处理函数
    markertap(e) {
      var index = e.markerId;
      console.log(index)
      this.showMarkerInfo(this.data.markers, index); // 显示标记点的信息
      this.changeMarkerColor(this.data.markers, index); // 改变标记点的颜色
      this.setData({
        cardCur: index, // 更新当前卡片索引
        // longitude:this.data.markers[this.data.cardCur].longitude,
        // latitude:this.data.markers[this.data.cardCur].latitude,
      });
    },
    // 显示标记点的信息
    showMarkerInfo(markers, index) {
      // var marker = markers[index];
      // console.log(marker)
      // this.setData({
      //   currentTextData: {
      //     name: marker.address,
      //     desc: marker.address
      //   }
      // });
    },
    // 改变标记点的颜色
    changeMarkerColor(markers, index) {
      var newMarkers = markers.map(function (item, i) {
        item.iconPath = (i == index) ? '../../../images/amap/marker_checked.png' : '../../../images/amap/marker.png';
        return item;
      });
      this.setData({
        markers: newMarkers,
        cardCur: index
      });
    },
    // 卡片相关
    cardSwiper(e) {
      this.setData({
        cardCur: e.detail.current,
      })
      this.showMarkerInfo(this.data.markers, e.detail.current); // 显示下一个标记点的信息
      this.changeMarkerColor(this.data.markers, e.detail.current); // 改变下一个标记点的颜色
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
      if (!this.data.markers || this.data.markers.length === 0) {
        return;
      }
      if (e.detail.source == "touch" || e.detail.source == "autoplay") {
        this.setData({
          swiperCurrent: e.detail.current
        })
      }
      this.showMarkerInfo(this.data.markers, e.detail.current); // 显示下一个标记点的信息
      this.changeMarkerColor(this.data.markers, e.detail.current); // 改变下一个标记点的颜色
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
    //跳转新增界面
    toAddClick(e) {
      var that = this
      //拿到点击的index下标
      var index = this.data.cardCur
      console.log(e)
      //将对象转为string
      var queryBean = JSON.stringify(this.data.markers[index])
      wx.navigateTo({
        url: "/pages/around/add/add?details=" + queryBean,
      })
    },
    //跳转详情界面
    queryItemClick: function (e) {
      var that = this
      //拿到点击的index下标
      var index = this.data.cardCur
      console.log(e)
      //将对象转为string
      var queryBean = JSON.stringify(this.data.markers[index])
      wx.navigateTo({
        url: "/pages/around/details/details?details=" + queryBean,
      })
    },

  },

})