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
  render(){
    return(
      <View style={{flex:1, marginBottom: 64}}>
        <WebView url={this.props.url}/>
      </View>
    );
  }

}


