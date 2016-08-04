'use strict';
import React, { Component } from 'react'
import {
  View,
  Text,
  WebView,
  AsyncStorage
} from 'react-native'

export default class Map extends Component{
  constructor (props) {
    super(props)
    this.state = ({
      url: null
    })
  }
  render(){
    var webView = null;
    if(this.state.url){
      webView = <WebView source={{url:this.state.url}}/>
    }
    return(
      <View style={{flex:1}}>
        {webView}
      </View>
    );
  }
  componentDidMount(){
    //TODO
    //完善地图模块的功能
    this.setState({
      url:'https://todaylg.github.io/webview/index.html'
    })
  }
}
