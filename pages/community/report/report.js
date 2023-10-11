// pages/community/report/report.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: [],
    index: 0,
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
  onSubmit: function (event) {
    const formData = event.detail.value;
    var that = this
    if (formData.name.length == 0) {
      wx.showToast({
        title: '请填写姓名',
        icon: 'error',
        duration: 1500
      })
      return false;
    }
    // 验证手机号码
    var myreg = /^1[3-9]\d{9}$/;
    if (formData.phone.length == 0) {
      wx.showToast({
        title: '填写联系电话',
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
    if (formData.content.length == 0) {
      wx.showToast({
        title: '请填写内容',
        icon: 'error',
        duration: 1500
      })
      return false;
    }
    formData.images = JSON.stringify(this.data.imgList);
    const extraData = {
      // title: '问题上报',
    }; // 新字段
    const data = Object.assign({}, formData, extraData); // 合并表单数据和新字段
    console.log(data); // 打印表单数据对象
    // 使用 wx.request 发送数据到后端API
    wx.request({
      url: app.globalData.apiUri + 'report/',
      data: data,
      method: 'POST',
      header: {
        "authorization": "Bearer " + wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res); // 打印后端API返回的数据
        // 处理成功提示信息
        if (res.statusCode == 201) {
          var report_id = res.data.id
          var images = that.data.imgList
          for (var i = 0; i < images.length; i++) {
            wx.uploadFile({
              filePath: images[i].path,
              name: 'image',
              url: app.globalData.apiUri + 'report_image/',
              formData: {
                'report': report_id
              },
              success(res) {
                console.log(res)
              }
            })
          }
          wx.requestSubscribeMessage({
            tmplIds: ['aAuVyMBl3gscHus9WJzI80tADXMnBu48K0f6bMwvNe8'],
            success (res) { 
              
            }
          })
          wx.showToast({
            title: '提交成功',
            success(res) {
              console.log(res)
              // setTimeout(function () {
              //   wx.navigateBack({
              //     delta: 1
              //   })
              // }, 1000);
            },
            fail(res) {
              wx.showToast({
                title: '提交失败',
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
        wx.showToast({
          title: '提交失败',
          icon: 'error'
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
  chooseAddress(){
    var that =this
    wx.choosePoi({
      success(res) {
        console.log(res)
        that.setData({
          address:res.address
        })
      }
    })
  },
  toMyDetail(){
    wx.navigateTo({
      url: '/pages/user/myreport/myreport',
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