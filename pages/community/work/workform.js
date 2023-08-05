// pages/community/repair/form.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type_index: 0,
    picker: '',
    imgList: [],
    item: '',
    picker_type: null,
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
  textareaBInput(e) {
    this.setData({
      textareaBValue: e.detail.value
    })
  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      type_index: e.detail.value,
      picker_id: e.currentTarget.dataset.id
    })
  },
  onSubmit: function (event) {
    var that = this
    const formData = event.detail.value;
    // 验证手机号码
    var myreg = /^1[3-9]\d{9}$/;
    if (formData.phone.length == 0) {
      wx.showToast({
        title: '输入的手机号为空',
        icon: 'success',
        duration: 1500
      })
      return false;
    } else if (formData.phone.length < 11) {
      wx.showToast({
        title: '手机号长度有误！',
        icon: 'success',
        duration: 1500
      })
      return false;
    } else if (!myreg.test(formData.phone)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'success',
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
    const extraData = {
      // 必须加上用户id
      user: wx.getStorageSync('userinfo').id,
    };
    const data = Object.assign({}, formData, extraData); // 合并表单数据和新字段

    console.log(data); // 打印表单数据对象
    // 使用 wx.request 发送数据到后端API
    wx.request({
      url: app.globalData.apiUri + 'work/',
      header:{
        "authorization":"Bearer "+ wx.getStorageSync('token')
      },
      method: 'POST',
      data: data,
      success: function (res) {
        console.log("居民服务表单提交数据：", res); // 打印后端API返回的数据
        // 处理成功提示信息
        if (res.statusCode == 201) {          
          var ticket_id = res.data.id
          var images = that.data.imgList
          for (var i = 0; i < images.length; i++) {
            wx.uploadFile({
              filePath: images[i].path,
              name: 'image',
              url: app.globalData.apiUri + 'work_image/',
              formData: {
                'ticket': ticket_id
              },
              success(res){
                console.log(res)
                wx.showToast({
                  title: '提交成功',
                  success(res) {
                    console.log(res)
                    setTimeout(function() {
                      wx.navigateBack({
                       delta:1
                      })
                    }, 1000);
                  },
                  fail(res){
                    wx.showToast({
                      title: '提交失败',
                    })
                  }
                })
              }
            })
          }         
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
    var that = this;
    var picker_type = [];
    wx.request({
      url: app.globalData.apiUri + 'work_type/',
      success: function (res) {
        console.log("工单类型获取成功", res)
        if (res.statusCode == 200 && res.data.length > 0) {
          for (var i = 0; i < res.data.length; i++) {
            // console.log(res.data[i].name)
            picker_type[i] = res.data[i].name;
          }
          that.setData({
            picker_type: picker_type,
            work_type: res.data
          })
        } else {
          console.log("工单类型获取失败")
        }
      }
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