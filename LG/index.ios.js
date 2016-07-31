/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict'
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator
} from 'react-native';
import HomePage from './jscore/HomePage_Test.js';

class LG extends Component {
  constructor(props) {
    super(props);
  
    this.state = {};
  }
  render() {
    return (
      <Navigator style = {styles.container}
        initialRoute={{//路由初始化配置信息，就是说页面加载时，第一次需要展现什么内容
          component: HomePage
        }}
        //configureScene: 场景转换动画配置。在RN看来，从一个页面切换到另外一个页面，就是从一个场景切换到另外一个场景，这里配置的是场景动画信息，比如Navigator.SceneConfigs.FadeAndroid 就是淡入淡出
        renderScene={(route, navigator) => { // 渲染场景，读取initialRouter传来的数据，确定显示哪些内容   用来渲染navigator栈顶的route里的component页面
          // route={component: xxx, name: xxx, ...}， navigator.......route 用来在对应界面获取其他键值
          return <route.component navigator={navigator} {...route} {...route.passProps}/>// {...route.passProps}即就是把passProps里的键值对全部以给属性赋值的方式展开 如：test={10}
        }}/>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

AppRegistry.registerComponent('LG', () => LG);
