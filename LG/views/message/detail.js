import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native'

export default class Detail extends Component{
  render(){
    var content = this.props.content;
    return (
      <ScrollView>

        <View style={styles.content}>
          <Text style={{lineHeight:20,}}>{content.message}</Text>
        </View>

        <View style={[styles.luokuan, {marginTop:25}]}>
          <View style={{flex:1}}></View>
          <Text style={[styles.text, {color:'#007AFF'}]}>{content.username}</Text>
        </View>

        <View style={styles.luokuan}>
          <View style={{flex:1}}></View>
          <Text style={[styles.text, {color:'#3BC1FF'}]}>{content.time}</Text>
        </View>

      </ScrollView>
    );
  }
}

var styles = StyleSheet.create({
  content:{
    marginTop:20,
    marginLeft:15,
    marginRight:15,
    opacity:0.85,
  },
  luokuan:{
    flex:1,
    flexDirection:'row',
    marginRight:20,
  },
  text:{
    lineHeight:20,
    width:90
  }
});
