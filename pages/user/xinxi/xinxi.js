Page({
  data: {
    contact_tel: "",
    show_customer_service: 0
  },
  onLoad: function (e) {
    getApp().page.onLoad(this, e);
  },
  loadData: function (e) {
    var t = this;
    t.setData({
      store: getApp().core.getStorageSync(getApp().const.STORE)
    }), getApp().request({
      url: getApp().api.user.index,
      success: function (o) {
        if (0 == o.code) {
          if ("my" == t.data.__platform) o.data.menus.forEach(function (e, t, a) {
            "bangding" === e.id && o.data.menus.splice(t, 1, 0);
          });
          t.setData(o.data), getApp().core.setStorageSync(getApp().const.PAGES_USER_USER, o.data),
            getApp().core.setStorageSync(getApp().const.SHARE_SETTING, o.data.share_setting),
            getApp().core.setStorageSync(getApp().const.USER_INFO, o.data.user_info);
        }
      }
    });
  },
  onReady: function (e) {
    getApp().page.onReady(this);
  },
  onShow: function (e) {
    getApp().page.onShow(this);
    this.loadData();
  },
  changeImage: function () {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片，只有一张图片获取下标为0
        var tempFilePaths = res.tempFilePaths[0];
        that.setData({
          userImg: tempFilePaths,
          actionSheetHidden: !that.data.actionSheetHidden
        })
          console.log(res);
          if (null != res) {
            that.setData({
              userImg: res
            })
          } else {
            // 显示消息提示框
            wx.showToast({
              title: '上传失败',
              icon: 'error',
              duration: 2000
            })
          }
      }
    })
  },
  bangding: function () {
    getApp().core.navigateTo({
      url: "/pages/bangding/bangding"
    });
  },
  formSubmit: function () {
    wx.showToast({
      title: '保存成功',
      icon: 'success',
      duration: 2000
    }),
    getApp().core.redirectTo({
      url: "/pages/user/user"
    });
  },
});