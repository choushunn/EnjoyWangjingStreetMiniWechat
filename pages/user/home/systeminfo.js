// pages/user/home/systeminfo.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this
    wx.getSystemInfo({
      success: function (res) {        
        var miniProgramVersion = wx.getAccountInfoSync().miniProgram.version;
        var version = res.version;
        var sdkVersion = wx.getSystemInfoSync().SDKVersion;
        var envVersion = wx.getAccountInfoSync().miniProgram.envVersion;
        var platform = res.platform;
        var model = res.model;
        var pixelRatio = res.pixelRatio;
        var screenWidth = res.screenWidth;
        var screenHeight = res.screenHeight;
        var windowWidth = res.windowWidth;
        var windowHeight = res.windowHeight;
        var language = res.language;
        var system = res.system;

        var items = {
          appName: '乐享王井街',
          envVersion:envVersion,
          miniProgramVersion:miniProgramVersion,
          version: version,
          sdkVersion: sdkVersion,
          platform: platform,
          model: model,
          pixelRatio: pixelRatio,
          screenWidth: screenWidth,
          screenHeight: screenHeight,
          windowWidth: windowWidth,
          windowHeight: windowHeight,
          language: language,
          system: system
        };

        console.log('设备信息：', items);
        that.setData({
          items: items
        });
      }
    });
  },
  checkUpdate: function () {
    wx.vibrateLong();
    
    const updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      if (res.hasUpdate) {
        // 有新版本可更新
        updateManager.onUpdateReady(function () {
          wx.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            success: function (res) {
              if (res.confirm) {
                // 用户确认更新
                updateManager.applyUpdate();
              }
              if(res.cancel){
                // 用户取消更新
                wx.showToast({
                  title: '用户取消更新',
                  icon: 'none'
                });
              }
            }
          });
        });

        updateManager.onUpdateFailed(function () {
          // 新版本下载失败
          wx.showModal({
            title: '更新提示',
            content: '新版本下载失败，请检查网络设置',
            showCancel: false
          });
        });
      } else {
        // 当前已是最新版本
        wx.showToast({
          title: '已经是最新版本',
          icon: 'none'
        });
      }
    });
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