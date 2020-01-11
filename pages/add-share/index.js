var app = getApp(), api = app.api;

Page({
    data: {
        mobile:'',
        form: {
            name: "",
            mobile: ""
        },
        img: "/images/img-share-un.png",
        agree: 0,
        show_modal: !1
    },
    onLoad: function(e) {
        getApp().page.onLoad(this, e);
    },
    onReady: function() {
        getApp().page.onReady(this);
    },
    onShow: function() {
        getApp().page.onShow(this);
        var t = this, a = getApp().getUser(), e = getApp().core.getStorageSync(getApp().const.SHARE_SETTING);
        getApp().core.showLoading({
            title: "加载中"
        }), t.setData({
            share_setting: e
        }), getApp().request({
            url: getApp().api.share.check,
            method: "POST",
            success: function(e) {
                0 == e.code && (a.is_distributor = e.data, getApp().setUser(a), 1 == e.data && getApp().core.redirectTo({
                    url: "/pages/share/index"
                })), t.setData({
                    __user_info: a
                });
            },
            complete: function() {
                getApp().core.hideLoading();
            }
        });
    },
    onHide: function() {
        getApp().page.onHide(this);
    },
    onUnload: function() {
        getApp().page.onUnload(this);
    },
    formSubmit: function(e) {
        var t = this, a = getApp().getUser();
        if (t.data.form = e.detail.value, null != t.data.form.name && "" != t.data.form.name) if (null != t.data.form.mobile && "" != t.data.form.mobile) {
          if (/^\d{11}$/.test(t.data.form.mobile)) {
                var o = e.detail.value;
                o.form_id = e.detail.formId, 0 != t.data.agree ? (getApp().core.showLoading({
                    title: "正在提交",
                    mask: !0
                }), getApp().request({
                    url: getApp().api.share.join,
                    method: "POST",
                    data: o,
                    success: function(e) {
                        0 == e.code ? (a.is_distributor = 2, getApp().setUser(a), getApp().core.redirectTo({
                            url: "/pages/add-share/index"
                        })) : getApp().core.showToast({
                            title: e.msg,
                            image: "/images/icon-warning.png"
                        });
                    }
                })) : getApp().core.showToast({
                    title: "请先阅读并确认分销申请协议！！",
                    image: "/images/icon-warning.png"
                });
            } else getApp().core.showModal({
                title: "提示",
                content: "手机号格式不正确",
                showCancel: !1
            });
        } else getApp().core.showToast({
            title: "请填写联系方式！",
            image: "/images/icon-warning.png"
        }); else getApp().core.showToast({
            title: "请填写姓名！",
            image: "/images/icon-warning.png"
        });
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    agreement: function() {
        getApp().core.getStorageSync(getApp().const.SHARE_SETTING);
        this.setData({
            show_modal: !0
        });
    },
    agree: function() {
        var e = this, t = e.data.agree;
        0 == t ? (t = 1, e.setData({
            img: "/images/img-share-agree.png",
            agree: t
        })) : 1 == t && (t = 0, e.setData({
            img: "/images/img-share-un.png",
            agree: t
        }));
    },
  changeInput(e) {
    let changed = {};
    let prop = e.currentTarget.dataset.prop
    changed[prop] = e.detail.value;
    this.setData(changed)
  },
    nextStep: function () {
      var e = this, t = this.data.mobile;
      t && 11 == t.length ? getApp().request({
        url: getApp().api.user.user_hand_binding,
        method: "POST",
        data: {
          content: t
        },
        success: function (t) {
          0 == t.code ? ( e.setData({
            content: t.msg,
            timer: !0
          })) : (t.code, getApp().core.showToast({
            title: t.msg
          }));
        }
      }) : getApp().core.showToast({
        title: "手机号码错误"
      });
    },
    close: function() {
        this.setData({
            show_modal: !1,
            img: "/images/img-share-agree.png",
            agree: 1
        });
    }
});