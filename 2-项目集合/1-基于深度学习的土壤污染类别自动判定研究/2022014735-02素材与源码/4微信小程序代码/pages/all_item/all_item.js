Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrls:[
      'https://famor-1307993323.cos.ap-nanjing.myqcloud.com/185634624.jpg',
      'https://famor-1307993323.cos.ap-nanjing.myqcloud.com/185636206.jpg',
      'https://famor-1307993323.cos.ap-nanjing.myqcloud.com/299102852.jpg',
      'https://famor-1307993323.cos.ap-nanjing.myqcloud.com/DSC_7606.jpg',
     ],
     indicatorDots:true,
     Height:"",
  },
  imgHeight:function(e){
    var winWid = wx.getSystemInfoSync().windowWidth; //获取当前屏幕的宽度
    var imgh=e.detail.height;//图片高度
    var imgw=e.detail.width;//图片宽度
    var swiperH=winWid*imgh/imgw + "px"//等比设置swiper的高度。 即 屏幕宽度 / swiper高度 = 图片宽度 / 图片高度  ==》swiper高度 = 屏幕宽度 * 图片高度 / 图片宽度
    this.setData({
      Height:swiperH//设置高度  
    })
  },
  Onclick1:function(e){
    wx.navigateTo({
      url: '/pages/detail1/detail1',
    })
  },
  Onclick2:function(e){
    wx.navigateTo({
      url: '/pages/detail2/detail2',
    })
  }, 
   Onclick3:function(e){
    wx.navigateTo({
      url: '/pages/detail3/detail3',
    })
  }, 
  Onclick5:function(e){
    wx.navigateTo({
      url: '/pages/detail5/detail5',
    })
  }, 
  Onclick4:function(e){
    wx.navigateTo({
      url: '/pages/detail6/detail6',
    })
  }, 
  Onclick6:function(e){
    wx.navigateTo({
      url: '/pages/soultion/soultion',
    })
  }, 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})
