// pages/around/add/add.js
const app =getApp();
let loading = false;
let loadingTop = false;
const animation = wx.createAnimation({
  duration: 400,
  timingFunction: 'ease-out',
  delay: 0,
  transformOrigin: '50% 50% 0'
}); //动画
Page({
  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    imgList: [],
    show: false,
    status: '',
    message: '',
    time: 0,
    showTop: false,
    statusTop: '',
    messageTop: '',
    timeTop: 2000,
    item:''
  },

  TimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },

  ChooseImage() {
    wx.chooseMedia({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '删除图片',
      content: '确定要删除图片吗？',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  setShow(status, message, time = 2000, fun = false) {
    if (loading) {
      return
    }
    loading = true;
    try {
      this.setData({
        status,
        message,
        time,
        show: true,
      })
      setTimeout(() => {
        this.setData({
          show: false,
        })
        loading = false;
        // 触发回调函数
        if (fun) {
          this.end()
        }
      }, time)
    } catch {
      loading = false;
    }
  },
  setShowTop(statusTop, messageTop, timeTop = 3000) {

    if (loadingTop) {
      return
    }

    loadingTop = true;
    try {
      this.setData({
        statusTop,
        messageTop,
        timeTop,
        showTop: true,
      })

      this.start_animation();
      setTimeout(() => {
        this.end_animation();
        loadingTop = false;
        this.triggerEvent("end")
      }, timeTop)

    } catch {
      loadingTop = false;
    }
  },
  /**
   * 轻提示回调函数
   */
  end() {
    wx.showToast({
      title: '触发回调方法',
    })
  },
  submit_data() {
    wx.showToast({
      title: '提交成功',
    })
  },
  onSubmit: function (event) {
    const formData = event.detail.value;
    console.log(formData); // 打印表单数据对象

    // 使用 wx.request 发送数据到后端API
    wx.request({
      url: app.globalData.apiUri + 'admin/community/TelephoneDirectoryAdmin/item',
      method: 'POST',
      data: formData,
      success: function(res) {
        console.log(res.data); // 打印后端API返回的数据
        // 处理成功提示信息
      },
      fail: function(res) {
        console.log(res.errMsg); // 打印错误信息
        // 处理失败提示信息
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const item = JSON.parse(options.details);  
    this.setData({
      item:item,
    })
    console.log(item)
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