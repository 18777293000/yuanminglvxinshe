Page({
  data: {
    longitude:'',
    latitude:'',
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
          var a = o.data.quick_map.lal.split(",") 
          o.data.quick_map.longitude = a[1]
          o.data.quick_map.latitude = a[0] 
          t.setData(o.data), getApp().core.setStorageSync(getApp().const.PAGES_USER_USER, o.data)
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