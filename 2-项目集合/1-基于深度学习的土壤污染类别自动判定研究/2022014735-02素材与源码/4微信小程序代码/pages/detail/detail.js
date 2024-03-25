// pages/detail/detail.js
var util = require('../../utils/util.js')
var WxParse = require('../../components/wxParse/wxParse.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    newsTitle: '',
    newsUrl: '',
    newsAuthor: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let { newsUrl } = options
    var that = this;
    wx.request({
      url: 'http://192.168.1.108:469/soil/get_news_detail',
      method: 'POST',  //请求方式
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        url: options.newsUrl,
        type:options.type
      },  //用于存放post请求的参数  
      success: function (res) {

        wx.hideLoading()
        that.setData({
          content:res.data.nodes
        })
      },
      fail: function () {
        wx.hideLoading()
        wx.showModal({
          title: '提示',
          content: '加载失败',
        })
       }
    })

  }
})
