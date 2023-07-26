// pages/around/details/details.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: '',
    TabCur: 0,
    scrollLeft: 0,
    goods_list: [{
        goods: [{
            img: 'https://image.meiye.art/FlqKg5bugFQD5Qzm_QhGM7ET4Mtx?imageMogr2/thumbnail/450x/interlace/1',
          },
          {
            img: 'https://image.meiye.art/Fha6tqRTIwHtlLW3xuZBJj8ZXSX3?imageMogr2/thumbnail/450x/interlace/1',
          },
          {
            img: 'https://image.meiye.art/FhHGe9NyO0uddb6D4203jevC_gzc?imageMogr2/thumbnail/450x/interlace/1',
          },
        ]
      },
      {
        goods: [{
            img: 'https://image.meiye.art/FhtISupNHMibBgrGZOe15CPQ-d5R?imageMogr2/thumbnail/450x/interlace/1',
          },
          {
            img: 'https://image.meiye.art/FgaFNs-YNxw_vRtqCbvQru3z6s3P?imageMogr2/thumbnail/450x/interlace/1',
          },
          {
            img: 'https://image.meiye.art/FqZALKFWQ7vEZtmJyMyB_w776B_H?imageMogr2/thumbnail/450x/interlace/1',
          },
        ]
      },
      {
        goods: [{
            img: 'https://image.meiye.art/FlqKg5bugFQD5Qzm_QhGM7ET4Mtx?imageMogr2/thumbnail/450x/interlace/1',
          },
          {
            img: 'https://image.meiye.art/Fha6tqRTIwHtlLW3xuZBJj8ZXSX3?imageMogr2/thumbnail/450x/interlace/1',
          },
          {
            img: 'https://image.meiye.art/FqZALKFWQ7vEZtmJyMyB_w776B_H?imageMogr2/thumbnail/450x/interlace/1',
          },
        ]
      }
    ],
    foodData: [{

    }],
    "foodData": [{
        id: 1,
        "title": "鱼香肉丝",
        "imgUrl": "https://img1.qunarzz.com/travel/poi/201403/28/daab198c5029a423ddb12cfb.jpg_r_720x400x95_0c4e4c13.jpg",
        "desc": "创建和谐社区，共建美好家园。创建文明和谐社区，共建温馨美好的家园！",
        "type": "活动",
        "datetime": "2023年5月26日",
      },
      {
        id: 2,
        "title": "宫保鸡丁",
        "imgUrl": "https://youimg1.c-ctrip.com/target/100i10000000o9w0fE878.jpg",
        "desc": "普及志愿服务理念 促进和谐社区建设，创展文明社区，建美好家园。",
        "type": "活动",
        "datetime": "2023年5月26日",
        "tags": [{
            "name": "党组织生活",
            "color": "bg-red"
          },
          {
            "name": "活动",
            "color": "bg-green"
          }
        ]
      },
      {
        id: 3,
        "title": "番茄炒蛋",
        "imgUrl": "https://image.scol.com.cn/data/attachment/forum/202002/25/1582633049799.jpg",
        "desc": "折互帮互助好邻里，互敬互爱好家庭。打造平安大院，构建和谐社会。",
        "type": "活动",
        "datetime": "2023年5月26日",
        "tags": [{
            "name": "党组织生活",
            "color": "bg-red"
          },
          {
            "name": "活动",
            "color": "bg-green"
          }
        ]
      }
    ],
    addressData: [{

    }],
    "addressData": [{
        id: 1,
        "title": "维也纳酒店",
        "desc": "重庆市两江新区龙兴镇普福大道481号",
        "distance": "距离当前位置678米",
        "num": "联系电话：023-122345646",
      },
      {
        id: 2,
        "title": "宫保鸡丁",
        "imgUrl": "https://youimg1.c-ctrip.com/target/100i10000000o9w0fE878.jpg",
        "desc": "普及志愿服务理念 促进和谐社区建设，创展文明社区，建美好家园。",
        "type": "活动",
        "datetime": "2023年5月26日",
      },
      {
        id: 3,
        "title": "番茄炒蛋",
        "imgUrl": "https://image.scol.com.cn/data/attachment/forum/202002/25/1582633049799.jpg",
        "desc": "折互帮互助好邻里，互敬互爱好家庭。打造平安大院，构建和谐社会。",
        "type": "活动",
        "datetime": "2023年5月26日",
      }
    ]
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log(options.details) 
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