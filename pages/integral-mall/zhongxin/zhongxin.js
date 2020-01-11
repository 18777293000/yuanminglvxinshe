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
          t.setData(o.data), getApp().core.setStorageSync(getApp().const.PAGES_USER_USER, o.data);
          getApp().request({
            url: getApp().api.integral.add,
            success: function (o) {
              if (0 == o.code) {
                t.setData(o.data), getApp().core.setStorageSync(getApp().const.PAGES_USER_USER, o.data)
              }
            }
          });
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
});