// pages/community/phone/phone.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dianhuadata: '',
    value: false
  }, // 点击列表,收缩与展示
  click(event) {
    const index = event.currentTarget.dataset.index;
    const {
      dianhuadata
    } = this.data;
    if (dianhuadata[index].checked == true) {
      dianhuadata[index].checked = false
    } else {
      dianhuadata[index].checked = true
    }
    this.setData({
      dianhuadata:dianhuadata
    });
  },
  checkboxChange(e) {
    this.setData({
      value: !this.data.value
    })
  },
  onSearch: function (e) {
    console.log(e)
    const keyword = '10081';
    const filteredData = this.data.dianhuadata.filter(item => {
      return item.number.indexOf(keyword) !== -1;
    });
    this.setData({
      dianhuadata: filteredData,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this
    wx.request({
      url: app.globalData.apiUri + 'telephone/',
      method: 'GET',
      success(res) {
        if (res.statusCode == 200) {
          console.log("便民电话获取成功：", res.data)
          var items = res.data
          // 读取成功
          if (items.length > 0) {
            // 转换接口数据为小程序数据结构
            const convertedData = [];

            for (const key in items) {
              const item = items[key];
            
              // 检查转换后数据数组中是否已存在该类型数据的 name
              const existingItem = convertedData.find((data) => data.name === item.type);
            
              if (existingItem) {
                // 如果存在，将当前数据添加到已存在的 name 中的 content 数组中
                existingItem.content.push({
                  id: item.id,
                  title: item.title,
                  number: item.number,
                  address: item.address
                });
              } else {
                // 如果不存在，创建新的 name 并添加到转换后数据数组中
                const newItem = {
                  name: item.type,
                  content: [{
                    id: item.id,
                    title: item.title,
                    number: item.number,
                    address: item.address
                  }],
                  checked: true
                };
                convertedData.push(newItem);
              }
            }
            
            console.log(convertedData);
            console.log(that.data.list)
            that.setData({
              dianhuadata: convertedData
            })
          }
        }
      }
    })
  },
  showHelp: function () {
    wx.showModal({
      title: '帮助信息',
      content: '提供常用的电话',
      showCancel: false,
    });
  },
  clickCall(e) {
    console.log(e)
    let phone = e.currentTarget.dataset.phone;
    wx.makePhoneCall({ //调用拨打电话的函数
      phoneNumber: phone,
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