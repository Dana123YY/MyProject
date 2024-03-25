const app = getApp()

Page({
  data: {
    swiperIndex: '1/4',
    topPic: [],
    tapID: 201701, // 判断是否选中
    contentNewsList: [],
    showCopyright: false,
    refreshing: false
  },

  onLoad: function() {
		this.setData({
			contentNewsList:[1,2,3,4,5,6,7,8,9]
		})
    this.renderPage('', false, () => {
      this.setData({
        showCopyright: true
      })
    })
  },

  // headerBar 点击
  headerTitleClick: function(e) {
    this.setData({ tapID: e.target.dataset.id })
    this.renderPage(e.currentTarget.dataset.newstype, false)
  },

  //跳转到新闻详情页
  viewDetail: function(e) {
    let newsUrl = e.currentTarget.dataset.newsurl || ''
    let newsTitle = e.currentTarget.dataset.newstitle || ''
    let newsAuthor = e.currentTarget.dataset.newsauthor || ''
    wx.navigateTo({
      url: '../detail/detail?newsUrl=' + newsUrl+"&type=paper"
    })
  },

  handleSwiperChange: function(e) {
    this.setData({
      swiperIndex: `${e.detail.current + 1}/4`
    })
  },

  onPulldownrefresh_SV() {
    this.renderPage('', true, () => {
      this.setData({
        refreshing: false
      })
    })
  },
  // isRefresh 是否为下拉刷新
  renderPage: function(newsType, isRefresh, calllBack) {
    if (!isRefresh) {
      wx.showLoading({
        title: '加载中'
      })
      var that = this;
			wx.request({
        url: 'http://192.168.1.108:469/soil/get_news',
        method: 'POST',  //请求方式
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data: {
          type: newsType,
        },  //用于存放post请求的参数  
        success: function (res) {
          console.log(1)
          console.log(res.data)
          wx.hideLoading()
          let { articleList} = res.data
          that.setData({
            contentNewsList: articleList,
          })
        },
        fail: function (res) {
          console.log(res)
          console.log(res.status)
          console.log(0)
          wx.hideLoading()
          wx.showModal({
            title: '提示',
            content: '加载失败',
          })
         }
      })
    } else {
      // 数组随机排序，模拟刷新
      let contentNewsListTemp = shuffle(JSON.parse(JSON.stringify(this.data.contentNewsList)))
      /* contentNewsListTemp.sort(() => {
        return Math.random() > 0.5 ? -1 : 1
      }) */
      setTimeout(() => {
        this.setData({
          contentNewsList: contentNewsListTemp
        })
        if (calllBack) {
          calllBack()
        }
      }, 2000)
    }
  }
})