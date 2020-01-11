var WxParse = require("/../../wxParse/wxParse.js"), shoppingCart = require("../../components/shopping_cart/shopping_cart.js"), specificationsModel = require("../../components/specifications_model/specifications_model.js"), gSpecificationsModel = require("../../components/goods/specifications_model.js"), quickNavigation = require("../../components/quick-navigation/quick-navigation.js"), goodsBanner = require("../../components/goods/goods_banner.js"), p = 1, is_loading_comment = !1, is_more_comment = !0, share_count = 0;

Page({
  data: {
    menuTapCurrent: "0",
    pageType: "STORE",
    id: null,
    goods: {},
    show_attr_picker: !1,
    form: {
      number: 1
    },
    tab_detail: "active",
    tab_comment: "",
    comment_list: [],
    comment_count: {
      score_all: 0,
      score_3: 0,
      score_2: 0,
      score_1: 0
    },
    autoplay: !1,
    hide: "hide",
    show: !1,
    x: getApp().core.getSystemInfoSync().windowWidth,
    y: getApp().core.getSystemInfoSync().windowHeight - 20,
    page: 1,
    drop: !1,
    goodsModel: !1,
    goods_num: 0,
    temporaryGood: {
      price: 0,
      num: 0,
      use_attr: 1
    },
    goodNumCount: 0
  },
  onLoad: function (t) {
    getApp().page.onLoad(this, t), quickNavigation.init(this);
    var e = this;
    share_count = 0, is_more_comment = !(is_loading_comment = !(p = 1));
    var o = t.quick;
    if (o) {
      var a = getApp().core.getStorageSync(getApp().const.ITEM);
      if (a) var i = a.total, s = a.carGoods; else i = {
        total_price: 0,
        total_num: 0
      }, s = [];
      e.setData({
        quick: o,
        quick_list: a.quick_list,
        total: i,
        carGoods: s,
        quick_hot_goods_lists: a.quick_hot_goods_lists
      });
    }
    if ("undefined" == typeof my) {
      var r = decodeURIComponent(t.scene);
      if (void 0 !== r) {
        var n = getApp().helper.scene_decode(r);
        n.uid && n.gid && (t.id = n.gid);
      }
    } else if (null !== getApp().query) {
      var d = app.query;
      getApp().query = null, t.id = d.gid;
    }
    e.setData({
      id: t.id
    }), e.getGoods(), e.getCommentList();
  },
  onReady: function () {
    getApp().page.onReady(this);
  },
  onShow: function () {
    getApp().page.onShow(this), shoppingCart.init(this), specificationsModel.init(this, shoppingCart),
      gSpecificationsModel.init(this), goodsBanner.init(this);
    var t = getApp().core.getStorageSync(getApp().const.ITEM);
    if (t) var e = t.total, o = t.carGoods, a = this.data.goods_num; else e = {
      total_price: 0,
      total_num: 0
    }, o = [], a = 0;
    this.setData({
      total: e,
      carGoods: o,
      goods_num: a
    });
  },
  onHide: function () {
    getApp().page.onHide(this), shoppingCart.saveItemData(this);
  },
  onUnload: function () {
    getApp().page.onUnload(this), shoppingCart.saveItemData(this);
  },
  onPullDownRefresh: function () {
    getApp().page.onPullDownRefresh(this);
  },
  onReachBottom: function () {
    getApp().page.onReachBottom(this);
    var t = this;
    "active" == t.data.tab_detail && t.data.drop ? (t.data.drop = !1, t.goods_recommend({
      goods_id: t.data.goods.id,
      loadmore: !0
    })) : "active" == t.data.tab_comment && t.getCommentList(!0);
  },
  play: function (t) {
    var e = t.target.dataset.url;
    this.setData({
      url: e,
      hide: "",
      show: !0
    }), getApp().core.createVideoContext("video").play();
  },
  close: function (t) {
    if ("video" == t.target.id) return !0;
    this.setData({
      hide: "hide",
      show: !1
    }), getApp().core.createVideoContext("video").pause();
  },
  to_dial: function (t) {
    var e = this.data.store.contact_tel;
    getApp().core.makePhoneCall({
      phoneNumber: e
    });
  },
  getGoods: function () {
    var r = this;
    if (r.data.quick) {
      var t = r.data.carGoods;
      if (t) {
        for (var e = t.length, o = 0, a = 0; a < e; a++) t[a].goods_id == r.data.id && (o += parseInt(t[a].num));
        r.setData({
          goods_num: o
        });
      }
    }
    getApp().request({
      url: getApp().api.default.goods,
      data: {
        id: r.data.id
      },
      success: function (t) {
        if (0 == t.code) {
          var e = t.data.detail;
          WxParse.wxParse("detail", "html", e, r);
          var o = t.data;
          o.attr_pic = t.data.attr_pic, o.cover_pic = t.data.pic_list[0].pic_url;
          var a = o.pic_list, i = [];
          for (var s in a) i.push(a[s].pic_url);
          o.pic_list = i, r.setData({
            goods: o,
            attr_group_list: t.data.attr_group_list,
            btn: !0
          })
        }
        1 == t.code && getApp().core.showModal({
          title: "提示",
          content: t.msg,
          showCancel: !1,
          success: function (t) {
            t.confirm && getApp().core.switchTab({
              url: "/pages/index/index"
            });
          }
        });
      }
    });
  },
  selectDefaultAttr: function () {
    var t = this;
    if (t.data.goods && 0 === t.data.goods.use_attr) {
      for (var e in t.data.attr_group_list) for (var o in t.data.attr_group_list[e].attr_list) 0 == e && 0 == o && (t.data.attr_group_list[e].attr_list[o].checked = !0);
      t.setData({
        attr_group_list: t.data.attr_group_list
      });
    }
  },
  getCommentList: function (e) {
    var o = this;
    e && "active" != o.data.tab_comment || is_loading_comment || is_more_comment && (is_loading_comment = !0,
      getApp().request({
        url: getApp().api.default.comment_list,
        data: {
          goods_id: o.data.id,
          page: p
        },
        success: function (t) {
          0 == t.code && (is_loading_comment = !1, p++ , o.setData({
            comment_count: t.data.comment_count,
            comment_list: e ? o.data.comment_list.concat(t.data.list) : t.data.list
          }), 0 == t.data.list.length && (is_more_comment = !1));
        }
      }));
  },
  tabSwitch: function (t) {
    "detail" == t.currentTarget.dataset.tab ? this.setData({
      tab_detail: "active",
      tab_comment: ""
    }) : this.setData({
      tab_detail: "",
      tab_comment: "active"
    });
  },
  commentPicView: function (t) {
    var e = t.currentTarget.dataset.index, o = t.currentTarget.dataset.picIndex;
    getApp().core.previewImage({
      current: this.data.comment_list[e].pic_list[o],
      urls: this.data.comment_list[e].pic_list
    });
  },
  navbarTap: function (e) {
    var that = this;
    console.log(e);
    this.setData({
      currentTab: e.currentTarget.id,   //按钮CSS变化
    })
  },
  listcat: function () {
    getApp().request({
      url: getApp().api.default.cat - list,
    });
  },
  menuTap: function (e) {
    var current = e.currentTarget.dataset.current;//获取到绑定的数据
    //改变menuTapCurrent的值为当前选中的menu所绑定的数据
    this.setData({
      menuTapCurrent: current
    });
  },
});