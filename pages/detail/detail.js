// pages/detail/detail.js

const HTTP = require('../../http/httpUtils')
const API = require('../../http/apiConfig')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    type: 0,        // 转化类型
    imgpath: '',    // 图片路径
    hasdone: false, // 是否转化成功
    resultpath: '', // 转化后的图片路径
    virtualCurrency: 0  //虚拟币个数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      title: options.title,
      type: options.type,
      imgpath: options.imgpath,
    })
    wx.setNavigationBarTitle({
      title: this.data.title,
    })
  },

    /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      virtualCurrency: getApp().globalData.userInfo.virtualCurrency
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      title: "一个好玩的小程序",
      path: "/pages/detail/detail?title=" + this.data.title + '&type=' + this.data.type + '&imgpath=' + this.data.resultpath,
      imageUrl: this.data.resultpath
    };
  },
  
  /**
   * 开始生成
   */
  startCompress() {
    var that = this;
    wx.showLoading({mask: true});
    HTTP.uploadFile(API.URL.api_start_change, this.data.imgpath, {'type': '0'})
      .then(response => {
        console.log(response);
        wx.hideLoading();
        var number = Math.random();
        wx.getFileSystemManager().writeFile({
          filePath: wx.env.USER_DATA_PATH + '/pic' + number + '.png',
          data:response.data.data,
          encoding: 'base64',
          success: res => {
            that.setData({
              resultpath: wx.env.USER_DATA_PATH + '/pic' + number + '.png'
            });
          },
          fail: err => {
            console.log(err);
          }
        });
        that.setData({
          virtualCurrency: response.data.coinNum,
        });
        getApp().globalData.userInfo.virtualCurrency = response.data.coinNum;
        wx.showToast({
          title: '转换成功',
        });
      }).catch(e => {
        wx.hideLoading();
        wx.showToast({
          title: '转换失败',
          icon: 'error'
        });
        console.log(e);
      });
  },
  /**
   * 保存到相册
   */
  saveToAlbum() {
    wx.saveImageToPhotosAlbum({
      filePath: this.data.resultpath,
      success: function() {
        wx.showToast({
          title: '保存成功',
        })
      },
      fail: () => {
        wx.showToast({
          title: '保存失败',
        })
      }
    })
  },

  sendFile() {
    wx.shareFileMessage({
      filePath: this.data.resultpath
    })
  },

  gotoPay() {
    wx.navigateTo({
      url: '../recharge/recharge',
    })
  }
})