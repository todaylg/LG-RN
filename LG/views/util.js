import React, { Component } from 'react'
import {
  PixelRatio//PixelRatio类提供了访问设备的像素密度的方法。
} from 'react-native'
//本模块用于获取设备屏幕的宽高。
import Dimensions from 'Dimensions'

//TODO
//ES6
var Util = {

  //单位像素
  pixel: 1 / PixelRatio.get(),//get()返回设备的像素密度，
  //屏幕尺寸
  size: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },

  //post请求
  post: function (url, data, callback) {
    var fetchOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      //parse用于从一个字符串中解析出json对象,
      //stringify()用于从一个对象解析出字符串(json)
      body: JSON.stringify(data)
    };
    //fetch()它接收一个URL参数，返回一个promise来处理response。response参数带着一个Response对象。
    fetch(url, fetchOptions)
    .then((response) => response.text())//作为参数传入下一个then?
    .then((responseText) => {
      callback(JSON.parse(responseText));
    });
  },
  //Key
  key: 'HSHHSGSGGSTWSYWSYUSUWSHWBS-REACT-NATIVE'//??????

};

module.exports = Util;