// pages/community/appointment/playroom/playroom.js
const app = getApp();
var now = new Date();
// 格式化时间
var year = now.getFullYear();
var month = now.getMonth() + 1;
var day = now.getDate();
var dateStr = year + '-' + month + '-' + day;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: null,
    currentDate:dateStr,
    appointment_time: null,
    picker_time: null,
    time_index: null,
    appointment_type: null,
    picker_type: null,
    type_index: null,
  },
  dateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  typeChange(e) {
    this.setData({
      type_index: e.detail.value
    })
  },
  timeChange(e) {
    this.setData({
      time_index: e.detail.value
    })
  },
  onSubmit: function (event) {
    const formData = event.detail.value;
    if (formData.name.length == 0) {
      wx.showToast({
        title: '姓名不能为空',
        icon: 'error',
        duration: 1500
      })
      return false;
    }
    var myreg = /^1[3-9]\d{9}$/;
    if (formData.phone.length == 0) {
      wx.showToast({
        title: '检查电话号码',
        icon: 'error',
        duration: 1500
      })
      return false;
    } else if (formData.phone.length < 11) {
      wx.showToast({
        title: '手机号长度有误！',
        icon: 'error',
        duration: 1500
      })
      return false;
    } else if (!myreg.test(formData.phone)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'error',
        duration: 1500
      })
      return false;
    }
    if (!formData.type) {
      wx.showToast({
        title: '请选择事项',
        icon: 'error',
        duration: 1500
      })
      return false;
    }
    if (!formData.date) {
      wx.showToast({
        title: '请选择日期',
        icon: 'error',
        duration: 1500
      })
      return false;
    }
    if (!formData.time) {
      wx.showToast({
        title: '请选择时间',
        icon: 'error',
        duration: 1500
      })
      return false;
    }
    const extraData = {
      title: '服务事项预约',
    }; // 新字段
    const data = Object.assign({}, formData, extraData); // 合并表单数据和新字段
    console.log(data); // 打印表单数据对象
    wx.request({
      url: app.globalData.apiUri + 'appointment/',
      method: 'POST',
      data: data,
      header:{
        "authorization":"Bearer "+ wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res); // 打印后端API返回的数据
        // 处理成功提示信息
        if (res.statusCode == 201) {
          wx.showToast({
            title: '提交成功',
            success: function () {
              setTimeout(function () {
                wx.navigateBack({
                  delta: 1
                })
              }, 1000);
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
  toMyDetail() {
    wx.navigateTo({
      url: '/pages/user/myappointment/myappointment',
    })
  },
    /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var token = wx.getStorageSync('token')
    if (!token) {
      wx.showToast({
        title: '请先登录',
        icon: 'error',
        success() {
          console.log("正在跳转至登录页面")
        }
      })
    }
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
    var that = this
    // 获取预约时间放到picker_tiem数组
    var picker_time = []
    wx.request({
      url: app.globalData.apiUri + 'appointment_time/',
      success(res) {
        console.log("可用预约时间:", res)
        if (res.statusCode == 200 && res.data.length > 0) {
          for (var i = 0; i < res.data.length; i++) {
            picker_time[i] = res.data[i].time
          }
          that.setData({
            picker_time: picker_time,
            appointment_time: res.data
          })
        }
      }
    })
    // 获取预约事项放到picker_type数组
    var picker_type = []
    wx.request({
      url: app.globalData.apiUri + 'appointment_type/',
      success(res) {
        console.log("可用预约类型:", res)
        if (res.statusCode == 200 && res.data.length > 0) {
          for (var i = 0; i < res.data.length; i++) {
            picker_type[i] = res.data[i].name
          }
          that.setData({
            picker_type: picker_type,
            appointment_type: res.data
          })
        }
      }
    })
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