/**
 * Created by lihua on 15/7/12.
 */

import React, { Component } from 'react'
import {
  WebView,
  ScrollView,
  Text,
  View
} from 'react-native'

export default class webview extends Component{
  constructor (props) {
    super(props)
  }
  render(){
    return(
      <View style={{flex:1, marginBottom: 64}}>
        <WebView source={{uri:this.props.url}}/>
      </View>
    );
  }

}


