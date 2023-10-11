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
      if (wx.getPrivacySetting) {
        wx.getPrivacySetting({
          success: res => {
            
              console.log("是否需要授权：", res.needAuthorization, "隐私协议的名称为：", res.privacyContractName)
              if (res.needAuthorization) {
                this.popUp()               
                            
              } else{
                this.triggerEvent("agree")
              }
          },
          fail: () => { },
          complete: () => { },
        })
      } else {
        // 低版本基础库不支持 wx.getPrivacySetting 接口，隐私接口可以直接调用
        this.triggerEvent("agree")
      }
    },
  },
  methods: {
      handleDisagree(e) {
          this.triggerEvent("disagree")
          this.disPopUp()
      },
      handleAgree(e) {
          this.triggerEvent("agree")
          this.disPopUp()
      },
      popUp() {
          this.setData({
              innerShow: true
          })        
      },
      disPopUp() {
          this.setData({
              innerShow: false
          })
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