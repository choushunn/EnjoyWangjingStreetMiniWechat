// pages/community/report/report.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: [],
    index:0,
  },
  chooseMedia() {
    wx.chooseMedia({
      count: 9, //最多选择9个
      mediaType: ['image', 'video'],
      sourceType: ['album', 'camera'], //可以从相册或相机选择
      camera: 'back',
      sizeType:['compressed'],
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
  onSubmit: function (event) {
    const formData = event.detail.value;
    // 验证手机号码
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
    } else {
      wx.showToast({
        title: '填写正确',
        icon: 'success',
        duration: 1500
      })
    }
    formData.images = JSON.stringify(this.data.imgList);
    const extraData = {
      // 必须加上用户id
      user: wx.getStorageSync('userinfo').id,
      title: '问题上报',
    }; // 新字段
    const data = Object.assign({}, formData, extraData); // 合并表单数据和新字段
    console.log(data); // 打印表单数据对象
    // 使用 wx.request 发送数据到后端API
    wx.request({
      url: app.globalData.apiUri + 'report/',
      data: data,
      method: 'POST',
      success: function (res) {
        console.log(res); // 打印后端API返回的数据
        // 处理成功提示信息
        if (res.statusCode == 201) {
          wx.showToast({
            title: '提交成功',
            success: function() {
              setTimeout(function() {
                wx.navigateBack({
                 delta:1
                })
              }, 1000);
            }
          })
        } else {
          wx.showToast({
            title: '提交失败',
            icon:'error'
          })
        }
      },
      fail: function (res) {
        console.log(res.errMsg); // 打印错误信息
        // 处理失败提示信息
        wx.showToast({
          title: '提交失败',
          icon:'error'
        })
      }
    })
  },
  showHelp: function () {
    wx.showModal({
      title: '帮助信息',
      content: '填写信息提交问题',
      showCancel: false,
    });
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