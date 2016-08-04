'use strict'
import React, { Component } from 'react'
import {
 View, 
 Animated, 
 Image, 
 TouchableHighlight, 
 Text,
 StatusBar,
 Navigator, 
 StyleSheet 
} from 'react-native'
import Login from './Login.js';
// import Login from '../views/login.js';//测试用

export default class HomePage extends Component{
  constructor (props) {
    super(props)
    this.state = ({
      isError: false,
      isLoading: true,
      isPlaying: true,
      fadeAnimLogo: new Animated.Value(0), // 设置动画初始值，生成Value对象
      fadeAnimText0: new Animated.Value(0),
      fadeAnimText1: new Animated.Value(0),
      fadeAnimLayout: new Animated.Value(1)
    })
  }

  async componentDidMount () {
    let timing = Animated.timing
    Animated.sequence([
      timing(this.state.fadeAnimLogo, {
        toValue: 1,
        duration: 800
      }),
      timing(this.state.fadeAnimText0, {
        toValue: 1,
        duration: 800
      }),
      timing(this.state.fadeAnimText1, {
        toValue: 1,
        duration: 800
      })
    ]).start(async() => {//start支持回调 
      this.setState({
        isPlaying: false,
        isLoading: false
      })

      setTimeout(() => this._hideWelcome(), 0)
    })
  }

  _hideWelcome () {
    if (this.state.isLoading || this.state.isPlaying) {
      return
    }

    Animated.timing(
      this.state.fadeAnimLayout,
      {
        toValue: 0,
        duration: 1000
      }).start(() => {
        this.setState({//触发重绘，隐藏开场动画
          welcomeEnd: true
        })
      })
  }

  render () {
    let content
    if (this.state.isLoading) {
      content = (<View style={{backgroundColor: 'black', flex: 1}}/>)
    } else {
    //动画过度以后显示的界面
      // content = (<View style={{backgroundColor: 'white', flex: 1}}/>)
      content = (<Navigator 
        initialRoute={{//路由初始化配置信息，就是说页面加载时，第一次需要展现什么内容
          component: Login
        }}
        renderScene={(route, navigator) => { // 渲染场景，读取initialRouter传来的数据，确定显示哪些内容   用来渲染navigator栈顶的route里的component页面
          // route={component: xxx, name: xxx, ...}， navigator.......route 用来在对应界面获取其他键值
          
          return <route.component navigator={navigator} {...route} {...route.passProps}/>// {...route.passProps}即就是把passProps里的键值对全部以给属性赋值的方式展开 如：test={10}
        }}/>)
    }

    return (
      <View style={styles.content} needsOffscreenAlphaCompositing renderToHardwareTextureAndroid >
        <StatusBar
         backgroundColor="white"
         barStyle="light-content"/>
        {content}
        {this._welcome()}
      </View>
      )
  }

  _welcome () {
    if (this.state.welcomeEnd) {//显示主页面
      return null
    }
    
    return (
      <Animated.View style={[styles.indicatorWrapper, {
        opacity: this.state.fadeAnimLayout
      }]}>
        <Animated.View
          style={{
            opacity: this.state.fadeAnimLogo, // Binds directly
            marginTop: 220,
            alignItems: 'center',
            transform: [{
              translateX: this.state.fadeAnimLogo.interpolate({
                inputRange: [0, 1],
                outputRange: [-40, 0]  // 0 : 150, 0.5 : 75, 1 : 0
              })
            }]
          }}>
          <Image source={require('./images/LG-Logo.png')} style={{width: 100, height: 100}}/>
        </Animated.View>

        <Animated.View
          style={{
            opacity: this.state.fadeAnimText0,
            position: 'absolute',
            bottom: 50,
            transform: [{
              translateX: this.state.fadeAnimText0.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 25]
              })
            }]
          }}>
          <Text style={styles.footerText}>LG</Text>
        </Animated.View>

        <Animated.View
          style={{
            opacity: this.state.fadeAnimText1,
            position: 'absolute',
            bottom: 30,
            transform: [{
              translateX: this.state.fadeAnimText1.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 25]
              })
            }]
          }}>
          <Text style={styles.footerText}>和你讲：React-Native可是个好东西！</Text>
        </Animated.View>
      </Animated.View>
      )
  }
}

var styles = StyleSheet.create({
  content: {
    backgroundColor: '#FFF',
    flex: 1
  },
  loadingText: {
    fontSize: 15,
    color: 'white',
    marginTop: 15
  },
  indicatorWrapper: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: 'black'
  },
  footerText: {
    color: '#FFF',
    fontSize: 16
  }

})

