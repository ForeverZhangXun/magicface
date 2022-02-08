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
    coinNum: 0  //虚拟币个数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      title: options.title,
      type: options.type,
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
      coinNum: getApp().globalData.userInfo.coinNum
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    HTTP.post(API.URL.api_share, {type : 'share'})
      .then(response => {
        console.log(response);
        if (response.data.flag == true) {
          wx.showToast({
            title: '分享成功',
          })
        }
      }).catch(e => {
        console.log(e);
      })
    return {
      title: "一个好玩的小程序",
      path: "/pages/detail/detail?title=" + this.data.title + '&type=' + this.data.type + '&imgpath=' + this.data.resultpath,
      imageUrl: this.data.resultpath
    };
  },

  chooseImage() {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        console.log(res.tempFilePaths[0])
        that.setData({
          imgpath: res.tempFilePaths[0]
        });
      }
    })
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
          coinNum: response.data.coinNum,
        });
        getApp().globalData.userInfo.coinNum = response.data.coinNum;
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