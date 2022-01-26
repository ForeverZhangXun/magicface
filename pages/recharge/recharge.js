// pages/recharge/recharge.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: '10元', value: 10, checked: 'false' },
      { name: '20元', value: 20, checked: 'false' },
      { name: '30元', value: 30, checked: 'false' },
      { name: '40元', value: 40, checked: 'false' },
      { name: '50元', value: 50, checked: 'true' },
    ],
    inputText: '',
    inputValue: 50
  },
  radioChange: function (e) {
    this.setData({
      inputValue: e.detail.value,
      inputText: ''
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getApp().globalData.userInfo.money = 10;
  },

  bindKeyInput(e) {
    if (e.detail.value.length > 0) {
      this.data.items[0].checked = false;
      this.data.items[1].checked = false;
      this.data.items[2].checked = false;
      this.data.items[3].checked = false;
      this.data.items[4].checked = false;
    }
    var that = this;
    this.setData({
      inputText: e.detail.value,
      inputValue: parseInt(e.detail.value),
      items: that.data.items
    });
  },

  confirm() {
    console.log(this.data.inputValue)
    getApp().globalData.userInfo.virtualCurrency = Number(getApp().globalData.userInfo.virtualCurrency) + Number(this.data.inputValue);
    wx.showToast({
      title: '充值成功',
      duration: 1000
    });
    wx.navigateBack();
    
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
  onShareAppMessage: function (res) {
    return {
      title: "一个好玩的小程序",
      path: "/pages/index/index",
    };
  },
})