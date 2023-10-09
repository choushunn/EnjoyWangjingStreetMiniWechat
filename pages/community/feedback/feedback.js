// pages/community/feedback/feedback.js
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgList: [],
    index: ''
  },
  showHelp: function () {
    wx.showModal({
      title: '帮助信息',
      content: '意见反馈',
      showCancel: false,
    });
  },
  chooseMedia() {
    wx.chooseMedia({
      count: 9, //最多选择9个
      mediaType: ['image', 'video'],
      sourceType: ['album', 'camera'], //可以从相册或相机选择
      camera: 'back',
      sizeType: ['compressed'],
      success: (res) => {
        console.log(res)
        const tempFiles = res.tempFiles;
        const tempFilePaths = res.tempFilePaths;
        const mediaType = res.type; //返回的文件类型，可以是图片或视频
        const mediaList = tempFiles.map((item) => {
          return {
            path: item.tempFilePath,
            type: item.type,
            size: item.size,
            duration: item.duration || 0
          };
        });
        // 将选择的媒体文件添加到imgList中
        const imgList = this.data.imgList.concat(mediaList);
        this.setData({
          imgList
        });
      },
      fail: (error) => {
        console.log(error);
        wx.showToast({
          title: '选择失败',
          icon: 'none'
        });
      }
    });
  }, // 删除图片
  deleteImage(e) {
    const index = e.currentTarget.dataset.index;
    const imgList = this.data.imgList.slice();
    imgList.splice(index, 1);
    this.setData({
      imgList
    });
  },
  // 预览图片
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
  checkboxChange: function (event) {
    // 获取被勾选的checkbox的值
    var checkedValues = event.detail.value;
    // 将勾选的值存储到页面的data对象中
    this.setData({
      feedbackTypes: checkedValues
    });
  },
  onSubmit: function (event) {
    var that = this
    const formData = event.detail.value;
    const extraData = {

    }; // 新字段
    const data = Object.assign({}, formData, extraData); // 合并表单数据和新字段
    console.log(data); // 打印表单数据对象
    // 使用 wx.request 发送数据到后端API
    wx.request({
      url: app.globalData.apiUri + 'feedback/',
      method: 'POST',
      data: data,
      header: {
        "authorization": "Bearer " + wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res); // 打印后端API返回的数据
        // 处理成功提示信息
        if (res.statusCode == 201) {
          var feedback_id = res.data.id
          var images = that.data.imgList
          for (var i = 0; i < images.length; i++) {
            wx.uploadFile({
              filePath: images[i].path,
              name: 'image',
              url: app.globalData.apiUri + 'feedback_image/',
              formData: {
                'feedback': feedback_id
              },
              success(res) {
                console.log(res)
              }
            })
          }
          // 上传图像
          wx.showToast({
            title: '提交成功',
            icon: 'success',
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
            icon: 'error'
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
      url: '/pages/user/myfeedback/myfeedback',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var token = wx.getStorageSync('token')
    if (!token) {
      wx.showModal({
        title: '您还未登录',
        content: '请先登录后办理服务',
        complete: (res) => {
          if (res.cancel) {            
              wx.navigateBack({
                delta: 1
              })          
          }      
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/user/home/home',
            })
          }
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