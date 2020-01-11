Page({
  data: {
    ht_pic:[]
  },
  onLoad: function (options) {
    console.log(options)
    var ctt=JSON.parse(options.ht_pic)
    console.log("数组",ctt)
    console.log(ctt[0].ht_pic)
    this.setData({
      ht_pic: ctt[0].ht_pic
    })
  },
  imageLoad: function (e) {
    var $width = e.detail.width,    //获取图片真实宽度
      $height = e.detail.height,
      ratio = $width / $height;    //图片的真实宽高比例
    //var viewWidth=718,           //设置图片显示宽度，左右留有16rpx边距
    //  viewHeight=718/ratio;    //计算的高度值
    var image = this.data.images;
    //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
    image[e.target.dataset.index] = {
      width: $width,
      height: $height
    }
    this.setData({
      images: image
    })
  }
});