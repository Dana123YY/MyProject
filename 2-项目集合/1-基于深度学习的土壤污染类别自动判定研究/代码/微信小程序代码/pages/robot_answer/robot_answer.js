// pages/robot_answer/robot_answer.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 输入框的值
    inputValue: '',
    // 当前聊天数据的列表的index
    current_index: 0,
    // 数据列表 
    current_list: [],
    // 缓存最多存的消息条数
    max_length: 2,
    // 是否聚焦
    input_flag: false,
    // 城市
    mycity: 'bj'
  },
 
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    // 首先从缓存中拿缓存的值，若有，则优先渲染
    that.getRecord();
  },
  // 获取缓存记录
  getRecord() {
    var that = this;
    var current_list = that.data.current_list;
    var key_time = 'my' + that.data.mycity + 'time';
    var key_list = 'my' + that.data.mycity + 'list';
    // 初始化
    var myRecord_time = (wx.getStorageSync(key_time) == undefined || wx.getStorageSync(key_time) == '') ? '' : wx.getStorageSync(key_time);
    var myRecord_list = (wx.getStorageSync(key_list) == undefined || wx.getStorageSync(key_list) == '') ? '' : wx.getStorageSync(key_list);
    if (myRecord_time && myRecord_list.length) {
      console.log(myRecord_list)
      that.setData({
        current_list: myRecord_list,
        current_index: myRecord_list.length
      }, function() {
        that.scrollToBottom();
      });
    }
  },
  // 创建缓存记录
  setRecord(par_kind, par_list) {
    var that = this;
    var current_list = that.data.current_list;
    var key_time = 'my' + that.data.mycity + 'time';
    var key_list = 'my' + that.data.mycity + 'list';
    // 初始化
    var myRecord_time = (wx.getStorageSync(key_time) == undefined || wx.getStorageSync(key_time) == '') ? '' : wx.getStorageSync(key_time);
    var myRecord_list = (wx.getStorageSync(key_list) == undefined || wx.getStorageSync(key_list) == '') ? [] : wx.getStorageSync(key_list);
    if (!myRecord_time) {
      wx.setStorage({
        key: key_time,
        data: myRecord_time,
      });
    }
    if (!myRecord_list) {
      wx.setStorage({
        key: key_list,
        data: [],
      });
    }
    myRecord_time = wx.getStorageSync(key_time);
    // 如果缓存中没有时间 或者 和今天的截止时间不一致时，须把今天的截止日期赋给它，同时发送默认消息，同时把截止日赋值给缓存，同时发送默认消息，同时把默认消息开关设置为true
    if (myRecord_time == '') {
      myRecord_time = get_endtime();
      // 用最新的覆盖
      wx.setStorage({
        key: key_time,
        data: myRecord_time,
      });
    }
    // 列表(将获取到的数据从头部添加，相当于最新的)
    var listdata = {
      'kind': par_kind,
      'list_ul': par_list
    };
    if (par_kind && par_list) {
      myRecord_list.push(listdata)
    }
    // 如果超过最大长度，需要截断
    if (myRecord_list.length > that.data.max_length) {
      myRecord_list.splice(0, 1)
    }
    wx.setStorage({
      key: key_list,
      data: myRecord_list,
    });
  },
  // 改变消息列表
  change_list(par_kind, par_list) {
    var that = this;
    var current_index = that.data.current_index;
    var data_key = "current_list[" + that.data.current_index + "]";
    var listdata = {
      'kind': par_kind,
      'list_ul': par_list
    };
    that.setData({
      current_index: current_index + 1,
      [data_key]: listdata,
    });
 
    if (par_kind == 'me') {
      that.setData({
        inputValue: ''
      });
    }
  },
  /**
   * 文本框输入事件
   */
  inputChange(e) {
    var that = this;
    that.setData({
      inputValue: e.detail.value,
    });
  },
  // 发送消息
  inputSend() {
    var that = this;
    var inputValue = that.data.inputValue;
    if (inputValue) {
      var param = {
        city: that.data.mycity,
        keyword: inputValue,
      }
      // 创建记录 往上滚动
      that.scroll_record_list('me', inputValue);
      // 搜索结果
      var num_arr = ["您好，我不明白您的问题，请您换个词提问"];
    //   var num = Math.floor(Math.random() * 5);
      var num=inputValue
      console.log(num)
      if (num == '常见的土壤污染类型有哪些？') {
        that.scroll_record_list('you', "您好，土壤污染可分为化学污染物、物理污染物、生物污染物和放射性污染物。化学污染物包括汞、镉、铅、砷等重金属和各种化学农药、农膜、除草剂等其他各类有机合成产物。物理污染物主要包括来自工厂、矿山的固体废弃物如尾矿、废石、粉煤灰和工业垃圾等。生物污染物包括带有各种致病菌的城市垃圾和由卫生设施排出的废水、废物和厩肥等。放射性污染物主要存在于核原料开采和大气层核爆炸地区，以90锶和137铯等在土壤中生存期长的放射性元素为主。");
      } 
      else if(num == '土壤污染物有哪些？') {
        that.scroll_record_list('you', "土壤中的污染物来源广、种类多，一般可分为无机污染物和有机污染物。无机污染物以重金属为主，如镉、汞、砷、铅、铬、铜、锌、镍，局部地区还有锰、钴、硒、钒、锑、铊、钼等。有机污染物种类繁多，包括苯、甲苯、二甲苯、乙苯、三氯乙烯等挥发性有机污染物，以及多环芳烃、多氯联苯、有机农药类等半挥发性有机污染物。");
      } 
      else if(num == '怎么判断土壤是否受到了污染？') {
        that.scroll_record_list('you', "1、当发现周围土壤散发异味，或颜色发生变化，出现板结、植物出现病态或死亡、农作物减产等现象时，可推测土壤受到污染。2、当周围有化工厂等易产生大量污、废水的企业，且污水长期排放时，可判断其附近土壤可能受到污染.3、另外，有建筑垃圾、生活垃圾、矿渣和炉渣等工业垃圾大量、长期堆放的土壤可能已受到污染。4、过量施农药、化肥，或长期进行污水灌溉的农田土壤可能受到污染。");
      } 
      else if(num == '土壤修复技术有哪些？') {
        that.scroll_record_list('you', "土壤热处理技术。对被污染的土壤进行加热，使其中的污染物挥发，以达到改变土壤状况的目的。分为高温热处理技术和低温热处理技术。但该种方法仅能去除土壤中的农药和有机污染物，难以去除重金属和腐蚀性污染物。化学修复技术。 向土壤中添加能够让其进行化学反应的物质，吸附、淋溶、挥发和降解污染物等，使有害物质与其发生反应，转化成对土壤没有危害的新物质。化学修复技术根据原理可分为：化学氧化技术、溶剂浸提技术、土壤淋洗技术等。其中，土壤淋洗技术是根据土壤的污染情况选用溶剂，将其注入被污染的土壤中，然后将包含污染物的液体从土层中抽提出来，进行分离和处理··········");
      } 
      else if(num == '土壤里的物质有什么？') {
        that.scroll_record_list('you', "固体物质包括土壤矿物质、有机质和微生物通过光照抑菌灭菌后得到的养料等。液体物质主要指土壤水分。气体是存在于土壤孔隙中的空气。土壤中这三类物质构成了一个矛盾的统一体。它们互相联系，互相制约，为作物提供必需的生活条件，是土壤肥力的物质基础。");
      } 
      else {
        that.scroll_record_list('you', '没有搜索到"' + inputValue + '"相关内容');
      }
    }
  },
  // 聚焦，失焦
  inputFocus(e) {
    var that = this;
    that.setData({
      input_flag: true
    });
  },
  inputBlue() {
    var that = this;
    that.setData({
      input_flag: false
    });
  },
  // 创建记录，同时页面往上滚动
  scroll_record_list(par_kind, par_list) {
    var that = this;
    // 改变消息列表
    that.change_list(par_kind, par_list);
    // 创建记录
    that.setRecord(par_kind, par_list);
    // 往上滚动
    that.scrollToBottom();
  },
  /**
   * 滚动页面到底部
   */
  scrollToBottom() {
    wx.pageScrollTo({
      scrollTop: 999999,
      duration: 100
    });
  },
})
 
// 获取当日23：59：59时间
function get_endtime() {
  var time_end = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1);
  var time_format = format_date(time_end)
  return time_format;
}
 
// 获取当前时间的  年月日时分秒  的时间格式化 20191220100246
function format_date(now) {
  var year = now.getFullYear(); //年
  var month = now.getMonth() + 1; //月
  var day = now.getDate(); //日
  var hh = now.getHours(); //时
  var mm = now.getMinutes(); //分
  var ss = now.getSeconds(); //秒
 
  var clock = year + "";
  if (month < 10) {
    clock += "0";
  }
  clock += month + "";
 
  if (day < 10) {
    clock += "0";
  }
  clock += day + "";
 
  if (hh < 10) {
    clock += "0";
  }
  clock += hh + "";
 
  if (mm < 10) {
    clock += '0'
  }
  clock += mm;
 
  if (ss < 10) {
    clock += '0'
  }
  clock += ss;
 
  return clock;
}