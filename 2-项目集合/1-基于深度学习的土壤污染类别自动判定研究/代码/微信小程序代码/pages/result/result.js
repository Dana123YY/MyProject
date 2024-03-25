// pages/result/result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: "",
    name: "",
    level: "",
    image: "",
    imageInfo: "",
    mark: "",
    showModal:"true"
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that = this;
    console.log(e);
    var pred = e.pred;
    var path = e.path
    if(pred.toString()=="1"){
      pred="受污染土壤"
    }else{
      pred="未污染土壤"
    }
    // var name = e.name;
    // var level = e.level;
    // var image = e.image;
    that.setData({
    // name: name,
    pred: pred,
    image: "http://192.168.1.108:469"+path,
    // imageInfo: imageInfo,
    showModal:"true"
    });
    console.log(that.data.imageInfo)
    wx.request({
      url:'',//接口名称   
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',  //请求方式    
      //用于存放post请求的参数   
      success(res) {
        console.log(res.data)
        console.log("[获取图片] 成功", res);
        var name = res.data['name'];
        var level = res.data['levelc'];
        var image = res.data['image'];
        console.log(name)
        that.setData({
          name: name,
          level: level,
          image: image
        });
        wx.showToast({
          title: '识别成功',
          image: '../../icons/icon/success.png',
          duration: 1000,
        })
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