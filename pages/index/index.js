// index.js
const app = getApp()
Page({
  data: {
    PageCur: 'home'
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  
  },
})
