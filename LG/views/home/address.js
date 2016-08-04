import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableHighlight,
  Linking,
  AlertIOS
} from 'react-native'

import Util from '../util'
import ActionSheetIOS from 'ActionSheetIOS'
import Service from './../service'



export default class Address extends Component{
  render(){
    var view = [];
    var items = this.props.data.status? this.props.data.data: [];
    var colors = ['#E20079', '#FFD602', '#000', '#F90000', '#04E246', '#04E246', '#00AFC9'];
    var color = {
      backgroundColor: colors[parseInt(Math.random()*7)]
    };
    for(var i in items){
      view.push(
        <View key={'addressItem' + i} style={styles.row}>
          <View style={[styles.text, color]}>
            <Text style={{fontSize:25, color:'#fff', fontWeight:'bold'}}>
              {items[i].username.substr(0, 1) || '未'}
            </Text>
          </View>
          <View style={styles.part}>
            <Text>
              {items[i].username}
            </Text>
            <Text style={styles.unColor}>
              {(items[i].partment||'') + '部－' + (items[i].tag||'') + '人员'}
            </Text>
          </View>
          <View style={{flex:1}}>
            <TouchableHighlight underlayColor="#fff"
              onPress={this.showActionSheet.bind(this, items[i].tel, items[i].email, items[i].username)}>
              <Text style={styles.link}>
                {items[i].tel}
              </Text>
            </TouchableHighlight>
            <TouchableHighlight underlayColor="#fff"
              onPress={this.showActionSheet.bind(this, items[i].tel, items[i].email, items[i].username)}>
              <Text style={styles.link}>
                {items[i].email}
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      );
    }
    return (
      <ScrollView style={{marginBottom: 64}}>
        {view}
      </ScrollView>
    );
  }

  showActionSheet=(tel, email, name)=> {
    var options = [];
    options.push('拨打电话给：' + name);
    options.push('发送短信给：' + name);
    options.push('发送邮件给：' + name);
    options.push('取消');

    var events = [];
    events.push(function(){
      Linking.openURL('tel://' + tel);
    });
    events.push(function(){
      Linking.openURL('sms://' + tel);
    });
    events.push(function(){
      Linking.openURL('mailto://' + email);
    });

//在iOS设备上显示一个ActionSheet弹出框，其中options参数为一个对象，其属性必须包含以下一项或多项：
//options（字符串数组） - 一组按钮的标题（必选）
//cancelButtonIndex（整型） - 选项中取消按钮所在的位置（索引）
//destructiveButtonIndex（整型） - 选项中删除按钮所在的位置（索引）
//title（字符串） - 弹出框顶部的标题
//message（字符串） - 弹出框顶部标题下方的信息
    ActionSheetIOS.showActionSheetWithOptions({
        options: options,
        cancelButtonIndex: options.length - 1 ,
      },
      function(index){
      events[index] && events[index]();
    }
    );
  }
}

var styles = StyleSheet.create({
  row:{
    height:80,
    borderBottomWidth: Util.pixel,
    borderBottomColor:'#ccc',
    flexDirection:'row',
    alignItems:'center'
  },
  text:{
    width:50,
    height:50,
    borderRadius:4,
    marginLeft:10,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#E30082',
  },
  part:{
    marginLeft:5,
    flex:1,
  },
  link:{
    color:'#1BB7FF',
    marginTop:2,
  },
  unColor:{
    color: '#575656',
    marginTop:8,
    fontSize:12,
  }
});
