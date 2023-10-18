Component({
  properties: {
    helpContent: {
      type: String,
      value: ''
    },
    showHelpButton: {
      type: Boolean,
      value: true
    },
    showAddButton: {
      type: Boolean,
      value: false
    },
    addButtonUrl: {
      type: String,
      value: ''
    }
  },
  methods: {
    showHelp: function() {
      wx.showModal({
        title: '帮助信息',
        content: this.properties.helpContent,
        showCancel: false,
      });
    },
    navigateToDetail: function() {
      const url = this.properties.addButtonUrl;
      if (url) {
        wx.navigateTo({
          url: url,
        });
      }
    }
  }
});