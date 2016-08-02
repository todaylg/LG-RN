import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native'
import webview from'./about/webview'


export default class About extends Component{
  constructor (props) {
    super(props)
  }
  render(){
    return (
      <ScrollView style={styles.container}>

        <View style={styles.wrapper}>
          <Image style={styles.avatar} source={require('image!me_1')}></Image>
          <Text style={{fontSize:14, marginTop:10, color:'#ABABAB'}}>LG</Text>
          <Text style={{fontSize:14, marginBottom:20, color:'#ABABAB'}}>Version: v0.0.1</Text>

          <View style={{flexDirection:'row'}}>
            <TouchableOpacity onPress={this._openWebView.bind(this, 'https://github.com/todaylg')}>
              <Image style={styles.img} source={require('image!github')}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={this._openWebView.bind(this, 'https://www.baidu.com')}>
              <Image style={[styles.img, {width:25,height:25}]} source={require('image!weibo')}/>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    );
  }

  _openWebView=(url)=>{
    this.props.navigator.push({
      title:'项目地址',
      component: webview,
      passProps:{
        url: url
      }
    });
  }
}

var styles = StyleSheet.create({
  container:{
    flex:1,
  },
  wrapper:{
    alignItems:'center',
    marginTop:50,
  },
  avatar:{
    width:90,
    height:90,
    borderRadius:45,
  },
  img:{
    width:20,
    height:20,
    marginRight:5,
  }
});
