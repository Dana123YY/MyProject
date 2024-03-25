// pages/camera/camera.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls:[
      '/images/title.jpg'
     ],
    count:0,
    imageInfo:"",
    index: "",
    mark: "",
    height:""
    // name: "",
    // level: "",
    // image: "",
  },
  Onclick3:function(e){
    wx.navigateTo({
      url: '/pages/detail3/detail3',
    })
  }, 
  Onclick4:function(e){
    wx.navigateTo({
      url: '/pages/newsdetail2/newsdetail2',
    })
  }, 
  Onclick5:function(e){
    wx.navigateTo({
      url: '/pages/detail1/detail1',
    })
  }, 
  Onclick6:function(e){
    wx.navigateTo({
      url: '/pages/detail3/detail3',
    })
  }, 
  Onclick7:function(e){
    wx.navigateTo({
      url: '/pages/detail5/detail5',
    })
  }, 
  Onclick8:function(e){
    wx.navigateTo({
      url: '/pages/detail/detail',
    })
  }, 
  Onclickimp:function(e){
    wx.navigateTo({
      url: '/pages/newsdetail/newsdetail',
    })
  },
  Onclickimp1:function(e){
    wx.navigateTo({
      url: '/pages/newsdetail1/newsdetail1',
    })
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
  // 绑定了打开相册并上传图片的事件
  uploadImage: function (e) {
    var that = this;
    var mark = e.currentTarget.dataset['index'];
    //console.log(index);
    that.setData({
      mark: mark,
    });
    console.log(that.data.mark)
    wx.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        that.setData({
          imageInfo: tempFilePaths[0],
        });
        // console.log(that.data.imageInfo);
        wx.showToast({
          title: '识别中',
          image: '../../icons/icon/load.png',
          duration: 3000,
        })
        // 从服务器中获取所选图片
        wx.uploadFile({
          url: "http://192.168.1.104:469/soil/uploader",
          filePath: that.data.imageInfo,
          name: "file",
          header: {
            'Content-Type': 'multipart/form-data',
          },
          method: 'POST', 
          formData: {
            mark: JSON.stringify(that.data.mark)
          },
          success: function (res) {
            // console.log(JSON.parse(res.data)) //与wx.request不同，wx.uploadFile返回的是[字符串]，需要自己转为JSON格式
            // console.log("[上传文件] 成功", res);
            var imgPath = JSON.parse(res.data)['file_path'];
            var pred = JSON.parse(res.data)['pred'];
                wx.navigateTo({
                  url: '../result/result?path='+imgPath+"&pred="+pred,
                });
          },
          fail: function (e) {
            console.log(e)
            wx.showToast({
              title: '识别失败',
              image: "../../icons/icon/cry.png",
              duration: 1500
          })
        }
        });
      },
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    let that=this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.model);
        if (res.model == "iPhone XR") {
          that.setData({
            height: "1100"
          })
        }
        else if (res.model == "iPhone 6/7/8 Plus") {
          that.setData({
            height: "850"
          })
        }
      },
    })
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