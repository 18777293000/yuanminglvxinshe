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
      url: getApp().api.default.kefu,
      success: function (o) {
        if (0 == o.code) {
          t.setData(o.data), getApp().core.setStorageSync(getApp().const.PAGES_USER_USER, o.data),
            getApp().core.setStorageSync(getApp().const.SHARE_SETTING, o.data.share_setting),
            getApp().core.setStorageSync(getApp().const.USER_INFO, o.data.user_info);
        }
      }
    });
  },
  call: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.contact_tel
    })
  },
  onReady: function (e) {
    getApp().page.onReady(this);
  },
  onShow: function (e) {
    getApp().page.onShow(this);
    this.loadData();
  },
});