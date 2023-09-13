let privacyHandler
let privacyResolves = new Set()
let closeOtherPagePopUpHooks = new Set()

wx.onNeedPrivacyAuthorization(resolve => {
  if (typeof privacyHandler === 'function') {
    privacyHandler(resolve)
  }
})

const closeOtherPagePopUp = (closePopUp) => {
  closeOtherPagePopUpHooks.forEach(hook => {
    if (closePopUp !== hook) {
      hook()
    }
  })
}

Component({
  data: {
    title: "个人信息保护提示",
    desc1: "我们会按照相关法律法规的规定，遵守正当合法、必要原则收集和使用你的个人信息。您使用前应当阅井同意",
    urlTitle: "《用户隐私保护指引》",
    desc2: "为了向你提供正常的服务，我们可能会申请相机、麦克风、存储照片等权限，相应权限并不会默认开启或强制收集信息。权限开启后，你可以随时通过设置选项关闭权限。你不同意开启权限，将不会影响其他非相关业务功能的正常使用。",
    innerShow: false,
    height: 0,
  },
  lifetimes: {
    attached: function() {
      const closePopUp = () => {
        this.disPopUp()
      }
      privacyHandler = resolve => {
        privacyResolves.add(resolve)
        this.popUp()
        // 额外逻辑：当前页面的隐私弹窗弹起的时候，关掉其他页面的隐私弹窗
        closeOtherPagePopUp(closePopUp)
      }
      
      closeOtherPagePopUpHooks.add(closePopUp)

      this.closePopUp = closePopUp
    },
    detached: function() {
      closeOtherPagePopUpHooks.delete(this.closePopUp)
    }
  },
  methods: {
    handleAgree(e) {
      this.disPopUp()
      // 这里演示了同时调用多个wx隐私接口时要如何处理：让隐私弹窗保持单例，点击一次同意按钮即可让所有pending中的wx隐私接口继续执行 （看page/index/index中的 wx.getClipboardData 和 wx.startCompass）
      privacyResolves.forEach(resolve => {
        resolve({
          event: 'agree',
          buttonId: 'agree-btn'
        })
      })
      privacyResolves.clear()
    },
    handleDisagree(e) {
      this.disPopUp()
      privacyResolves.forEach(resolve => {
        resolve({
          event: 'disagree',
        })
      })
      privacyResolves.clear()
    },
    popUp() {
      if (this.data.innerShow === false) {
        this.setData({
          innerShow: true
        })
      }
    },
    disPopUp() {
      if (this.data.innerShow === true) {
        this.setData({
          innerShow: false
        })
      }
    },
    openPrivacyContract() {
      wx.openPrivacyContract({
        success: res => {
          console.log('openPrivacyContract success')
        },
        fail: res => {
          console.error('openPrivacyContract fail', res)
        }
      })
    }
  }
})

