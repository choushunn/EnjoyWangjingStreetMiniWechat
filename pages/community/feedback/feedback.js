// pages/community/feedback/feedback.js
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgList: [],
    selectedTypes: [], // 已选择的类型数组
    typeButtons: [ // 所有类型按钮的数组
      { type: '社区服务', class: '' },
      { type: '生活服务', class: '' },
      { type: '产品建议', class: '' },
      { type: '安全分类', class: '' },
      { type: '功能异常', class: '' },
      { type: '其他问题', class: '' },
    ],
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
  checkboxChange: function(event) {
    // 获取被勾选的checkbox的值
    var checkedValues = event.detail.value;
    // 将勾选的值存储到页面的data对象中
    this.setData({
      feedbackTypes: checkedValues
    });
  },
  onSubmit: function (event) {
    const formData = event.detail.value;
    const extraData = {
      user: 1
    }; // 新字段
    const data = Object.assign({}, formData, extraData); // 合并表单数据和新字段
    console.log(data); // 打印表单数据对象
    // 使用 wx.request 发送数据到后端API
    wx.request({
      url: app.globalData.apiUri + 'feedback/',
      method: 'POST',
      data: {data,
        feedbackTypes: this.data.feedbackTypes, 
      },
      success: function (res) { 
        console.log(res); // 打印后端API返回的数据
        // 处理成功提示信息
        if (res.statusCode == 200) {
          wx.showToast({
            title: '提交成功',
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