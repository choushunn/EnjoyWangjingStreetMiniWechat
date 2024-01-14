// pages/user/myorder/detail.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    count: 5,
    active: 1,
    score: 5,
    item:'',
    apiUri:app.globalData.apiUri
  }, // 预览图片

  previewImage(e) {
    const current = e.currentTarget.dataset.src;
    const urls = this.data.imgList.map((item) => {
      return item.path;
    });
    wx.previewImage({
      current,
      urls
    });
  },
  /**
   * 点击评分
   */
  click(e) {
    const {
      score,
      count
    } = this.data;
    const active = e.currentTarget.dataset.index;
    this.setData({
      active
    })
    this.triggerEvent("click", {
      result: score / count * active
    }, {})
    console.log(this.data);
    // 点击以后更新这个分数到后台
    const data = {
      ticket: this.data.item.id,
      rating: active
    };    
    console.log(data)
    wx.request({      
      url: app.globalData.apiUri + 'work_review/',
      data: data,
      method: 'POST',
      header: {
        "authorization": "Bearer " + wx.getStorageSync('token')
      },
      success: function (res) {
        console.log("服务评价数据：", res); // 打印后端API返回的数据
        // 处理成功提示信息
        if (res.statusCode == 201) {
          wx.showToast({
            title: '评价成功',
            success(res) {
              console.log(res)          
            },
            fail(res) {
              wx.showToast({
                title: '评价失败',
              })
            }
          })
        } else {
          wx.showToast({
            title: '提交失败',
          })
        }
      },
      fail: function (res) {
        console.log(res.errMsg); // 打印错误信息
        
        // 处理失败提示信息
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log("传递数据", options)
    const work_id = options.id
    var rating = 5
    var that = this
    // 尝试从本地存储中获取 count 值
    wx.request({
      url: app.globalData.apiUri + 'work_review/?ticket='+work_id,
      method: 'GET',
      header:{
        "authorization":"Bearer "+ wx.getStorageSync('token')
      },
      success(res) {
        console.log("我的评价数据获取成功", res.data)
        rating = res.data[0] && res.data[0].rating || 5;
        that.setData({
          active: rating
        })
      }
    })
    const itemObject = JSON.parse(options.item);
    console.log(itemObject);
    this.setData({
      item:itemObject
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})