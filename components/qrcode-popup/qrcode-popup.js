Component({
  data: {
    showPopup: false, // 初始状态设为 false，不显示弹出窗口
    qrcodeUrl: '/assets/qrcode_for_gh_29b0a18f0f6d_258.jpg',
    countdown: 15
  },
  methods: {
    closePopup() {
      this.setData({
        showPopup: false
      });
    },
    startCountdown() {
      let countdown = this.data.countdown;
      const timer = setInterval(() => {
        countdown--;
        if (countdown <= 0) {
          clearInterval(timer);
          this.closePopup();
        } else {
          this.setData({
            countdown: countdown
          });
        }
      }, 1000);
    },

    recognizeQrCode(event) {
      const imageUrl = this.data.qrcodeUrl;
      wx.previewImage({
        current: imageUrl,
        urls: [imageUrl],
        success: (res) => {
          // 预览成功回调
        },
        fail: (res) => {
          console.log('预览图片失败', res);
        }
      });
    }
  },

  lifetimes: {
    attached() {
      const hasShownPopup = wx.getStorageSync('hasShownPopup');
      if (!hasShownPopup) {
        this.setData({
          showPopup: true
        });
        this.startCountdown();
        wx.setStorageSync('hasShownPopup', true);
      }
    }
  }
});