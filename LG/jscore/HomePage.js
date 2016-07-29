'use strict'
import React, { Component } from 'react'
import {
 View, 
 Animated, 
 Image, 
 TouchableHighlight, 
 Text, 
 StyleSheet 
} from 'react-native'


class HomePage extends Component {
  constructor (...args) {
    super(...args)
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
        isLoading: false//还没有读数据这一个步骤
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
    } else {//动画过度以后显示的界面
      content = (<View style={{backgroundColor: 'white', flex: 1}}/>)
    }

    return (
      <View style={styles.content} needsOffscreenAlphaCompositing renderToHardwareTextureAndroid >
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
    backgroundColor: '#434243',
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

module.exports = HomePage
