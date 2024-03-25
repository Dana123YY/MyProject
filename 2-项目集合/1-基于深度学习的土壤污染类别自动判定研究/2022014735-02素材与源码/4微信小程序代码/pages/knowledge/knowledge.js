// pages/knowledge/knowledge.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
   

  data: {
    navbar: ['知识科普', '修复措施'],
    currentTab: 0,
    ques1:true,
    ques1_re:false,
    ischeck:true,
    ques2:true,
    ques2_re:false,
    ques3:true,
    ques3_re:false,
    ques4:true,
    ques4_re:false,
    ques5:true,
    ques5_re:false,
    ques6:true,
    ques6_re:false,
    ques7:true,
    ques7_re:false,
    ques8:true,
    ques8_re:false,
    ques9:true,
    ques9_re:false,
    ques10:true,
    ques10_re:false,
    ques11:true,
    ques11_re:false,
    ques12:true,
    ques12_re:false
  },
  navbarTap: function(e){
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  questap1:function(){
      this.setData({
        ques1:false,
        ques1_re:true,
          ischeck:false
      })
  },
  questap1_rt:function(){
      this.setData({
        ques1:true,
        ques1_re:false,
          ischeck:true
      })
  },

  questap2:function(){
    this.setData({
        ques2:false,
        ques2_re:true,
    })
},
questap2_rt:function(){
    this.setData({
      ques2:true,
      ques2_re:false,
        ischeck:true
    })
},
questap3:function(){
    this.setData({
      ques3:false,
      ques3_re:true,
        ischeck:false
    })
},
questap3_rt:function(){
    this.setData({
      ques3:true,
      ques3_re:false,
        ischeck:true
    })
},
questap4:function(){
    this.setData({
      ques4:false,
      ques4_re:true,
        ischeck:false
    })
},
questap4_rt:function(){
    this.setData({
      ques4:true,
      ques4_re:false,
        ischeck:true
    })
},  
questap5:function(){
    this.setData({
      ques5:false,
      ques5_re:true,
        ischeck:false
    })
},
questap5_rt:function(){
    this.setData({
      ques5:true,
      ques5_re:false,
        ischeck:true
    })
}, 
questap6:function(){
    this.setData({
      ques6:false,
      ques6_re:true,
        ischeck:false
    })
},
questap6_rt:function(){
    this.setData({
      ques6:true,
      ques6_re:false,
        ischeck:true
    })
}, 
questap7:function(){
    this.setData({
      ques7:false,
      ques7_re:true,
        ischeck:false
    })
},
questap7_rt:function(){
    this.setData({
      ques7:true,
      ques7_re:false,
        ischeck:true
    })
}, 
questap8:function(){
    this.setData({
      ques8:false,
      ques8_re:true,
        ischeck:false
    })
},
questap8_rt:function(){
    this.setData({
      ques8:true,
      ques8_re:false,
        ischeck:true
    })
}, 
questap9:function(){
    this.setData({
      ques9:false,
      ques9_re:true,
        ischeck:false
    })
},
questap9_rt:function(){
    this.setData({
      ques9:true,
      ques9_re:false,
        ischeck:true
    })
}, 
questap10:function(){
    this.setData({
      ques10:false,
      ques10_re:true,
        ischeck:false
    })
},
questap10_rt:function(){
    this.setData({
      ques10:true,
      ques10_re:false,
        ischeck:true
    })
}, 
questap11:function(){
    this.setData({
      ques11:false,
      ques11_re:true,
        ischeck:false
    })
},
questap11_rt:function(){
    this.setData({
      ques11:true,
      ques11_re:false,
        ischeck:true
    })
}, 
questap12:function(){
    this.setData({
      ques12:false,
      ques12_re:true,
        ischeck:false
    })
},
questap12_rt:function(){
    this.setData({
      ques12:true,
      ques12_re:false,
        ischeck:true
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