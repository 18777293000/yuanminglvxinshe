Page({
  data: {
    ctt_list: []
  },
  onLoad: function (options) {
    console.log(options)
    var ctt = JSON.parse(options.ctt_list)
    console.log("数组", ctt)
    console.log(ctt[0].ctt_list)
    this.setData({
      ctt_list: ctt[0].ctt_list
    })
  },

  xiazai: function () {
  }
});