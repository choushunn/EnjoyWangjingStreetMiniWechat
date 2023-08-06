import QQMapWX from '../../../libs/qqmap-wx-jssdk.min';
// 实例化API核心类
var qqmapsdk;
const app = getApp();
Component({
  data: {
    // 获取导航栏高度
    CustomBar: app.globalData.CustomBar,
    // 地图相关  
    latitude: null,
    longitude: null, // 当前位置的经度
    currentLocation: null, // 当前定位点的信息   
    markersData: null, // 获取到的周边POI数据
    markers: null, // 地图上的标记点
    hasLocations: false, // 是否已经获取过周边 POI 数据
    backToCurrentLocation: false,
    // 滑动卡片相关
    modalName: null, // 模态框名称
    cardCur: 0,
    swiperCurrent: 0, // 当前卡片索引
    // 搜索地点相关
    hot_list: ["餐饮", "学校", "商店", "医院", "酒店", "其他"],
    mapCtx: ''
  },
  lifetimes: {
    created: function () {
      wx.request({
        url: app.globalData.apiUri + 'system_params/?key=qqmapkey',
        success(res) {
          // var key = res.data[0].value
        }
      })
      // 实例化API核心类
      qqmapsdk = new QQMapWX({
        key: 'NXOBZ-I3XHI-2L2GT-U2T6N-4QBDZ-ZKFAS'
      });
    },
    attached: function () {

    },
    ready() {
      var setting
      wx.getSetting({
        success(res) {
          console.log(res)
          setting = res
          if (setting.authSetting['scope.userLocation']) {

          }
        }
      })
      // 开始获取位置信息
      this.startLocation()
      this.mapCtx = wx.createMapContext('myMap')
    }
  },
  methods: {
    choosePoi(e) {
      // wx.choosePoi({
      //   success(res) {
      //     console.log(res)
      //   }
      // })
      var that = this
      wx.chooseLocation({
        latitude: that.data.currentLocation.latitude,
        longitude: that.data.currentLocation.longitude,
        success(res) {
          console.log(res)
        }
      })
    },
    // 导航到某个地点
    toAddress(e) {
      console.log(e.currentTarget.dataset.item)
      var item = e.currentTarget.dataset.item
      wx.openLocation({
        'latitude': item.location.lat,
        'longitude': item.location.lng,
        scale: 28,
        name: item.address, //打开后显示的地址名称
      })
    },
    // 跳转到地点详情页
    toDetail(e) {
      console.log(e)
      var id = e.currentTarget.dataset.item.id
      var item = JSON.stringify(e.currentTarget.dataset.item)
      // 跳转到详情页面
      wx.navigateTo({
        url: '/pages/around/detail/detail?id=' + id + '&item=' + item,
      })
    },
    // 地图相关
    startLocation() {
      wx.showLoading({
        title: '定位中...',
        mask: true,
      })
      var that = this;
      wx.getLocation({
        success(res) {
          console.log("当前地点：", res)
          var latitude = res.latitude; // 返回纬度
          var longitude = res.longitude; // 返回经度
          // 逆地址解析
          qqmapsdk.reverseGeocoder({
            latitude: latitude,
            longitude: longitude,
            get_poi: 1,
            success: function (res) {
              wx.hideLoading()
              console.log("逆地址解析：", res.result)
              var _res = res.result;
              wx.setStorageSync('markersData', _res.pois)
              var markers = [];
              markers = _res.pois.map(function (item, index) {
                return {
                  id: index,
                  latitude: item.location.lat,
                  longitude: item.location.lng,
                  title: item.title,
                  address: item.address,
                  iconPath: '../../../images/amap/marker.png',
                  width: 20,
                  height: 30,
                  callout: {
                    content: item.title + '\n' + item.address,
                    color: '#000000',
                    fontSize: 14,
                    borderRadius: 10,
                    bgColor: '#ffffff',
                    padding: 10,
                    display: 'BYCLICK'
                  }
                };
              });
              // 获取当前位置返回结果，放到mks数组中
              var currentLocation = []
              currentLocation.push({
                id: 0,
                latitude: _res.location.lat,
                longitude: _res.location.lng,
                title: _res.address,
                address: _res.address,
                iconPath: '../../../images/amap/mapicon_navi_s.png',
                width: 20,
                height: 30,
                callout: {
                  content: res.address,
                  color: '#000',
                  fontSize: 12,
                  borderRadius: 10,
                  display: 'ALWAYS'
                }
              });
              wx.setStorageSync('markers', markers)
              wx.setStorageSync('currentLocation', markers[0])
              that.setData({
                latitude: _res.location.lat,
                longitude: _res.location.lng,
                currentLocation: currentLocation[0],
                markersData: _res.pois,
                markers: markers
              });
            },
            fail(res) {
              console.log(res)
            }
          })
        }
      })
    },
    searchPOI: function (keyword) {
      var that = this;
      qqmapsdk.search({
        keyword: keyword,
        success: function (res) {
          console.log("搜索到的周边数据：", res.data);
          wx.hideLoading()
          var data = res.data;
          var markers = data.map(function (item, index) {
            return {
              id: index,
              latitude: item.location.lat,
              longitude: item.location.lng,
              title: item.title,
              address: item.address,
              iconPath: '../../../images/amap/marker.png',
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
          that.setData({
            backToCurrentLocation: false,
            hasLocations: true,
            markersData: data,
            markers: markers
          });
          wx.setStorageSync('markersData', data)
          wx.setStorageSync('markers', markers)
        },
        fail: function (res) {
          wx.hideLoading()
          console.log(res);
          wx.showToast({
            title: '定位太频繁，请稍后重试',
            icon: 'loading',
            duration: 2500,
            complete() {
              that.setData({
                modalName: 'DrawerModalR'
              })
            }
          })
        }
      });
    },
    // 点击定位按钮时触发的方法
    backToLocation() {
      // 将地图中心点移动到当前定位点位置并显示在地图正中间
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
      this.changeMarkerColor(this.data.markers, index); // 改变标记点的颜色
      this.setData({
        cardCur: index, // 更新当前卡片索引
      });
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
      this.changeMarkerColor(this.data.markers, e.detail.current); // 改变下一个标记点的颜色
    }, // towerSwiper
    // 初始化towerSwiper
    towerSwiper(name) {
      let list = this.data[name] || [];
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
      //拿到点击的index下标
      var index = this.data.cardCur
      console.log(e)
      //将对象转为string
      var queryBean = JSON.stringify(this.data.markers[index])
      wx.navigateTo({
        url: "/pages/around/add/add?details=" + queryBean,
      })
    },
    bindInput(e) {
      console.log(e)
      // 搜索关键字，并替换地图上的点
      this.searchPOI(e.detail.value)
    },
    searchType(e) {
      console.log(e)
      this.searchPOI(e.currentTarget.dataset.item)
      // 1秒后关闭模态框 
      this.hideModal(e)
    }
  }
})