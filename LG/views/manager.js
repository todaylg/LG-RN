import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage
} from 'react-native'
import Util from './util'
import AddUser from './manager/addUser'
import ModifyPassword from './manager/modifyPassword'
import DeleteUser from './manager/deleteUser'
import PostMessage from './manager/postMessage'


export default class Manager extends Component{
  constructor (props) {
    super(props)
  }
  render(){
    var colors = ['#F4000B', '#17B4FF', '#FFD900', '#F00000'];
    var tags = ['P', 'A', 'D', 'M'];
    var items = ['修改密码', '增加联系人', '删除联系人',  '发布公告'];
    var components = [ModifyPassword, AddUser, DeleteUser, PostMessage];
    var JSXDOM = [];
    for(var i in items){
      JSXDOM.push(
        <TouchableOpacity key={items[i]} onPress={this._loadPage.bind(this, components[i], items[i])}>
          <View style={[styles.item, {flexDirection:'row'}]}>
            <Text style={[styles.tag, {color: colors[i]}]}>{tags[i]}</Text>
            <Text style={[styles.font,{flex:1}]}>{items[i]}</Text>
          </View>
        </TouchableOpacity>
      );
    }


    return (
      <ScrollView style={styles.container}>
        <View style={styles.wrapper}>
          {JSXDOM}
        </View>

        <View style={{marginTop:30}}>
          <TouchableOpacity onPress={this._clear}>
            <View style={[styles.item, {flexDirection:'row'}]}>
              <Text style={[styles.tag, {color: colors[i]}]}>Q</Text>
              <Text style={[styles.font,{flex:1}]}>退出登录</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  _loadPage=(component, title)=>{
    this.props.navigator.push({
      title: title,
      component: component
    });
  }

  _clear=()=>{
    //TODO
    // this.setState({
    //       showIndex: {
    //         height:0,
    //         opacity:0
    //       },
    //       showLogin:{
    //         flex:1,
    //         opacity:1
    //       },
    //       isLoadingShow: false
    //     });
    this.props.navigator.pop();//这里有bug，回不到登录的页面，因为没有上一页
    AsyncStorage.clear();//大哥。。这是直接清除全部啊，不能实现记录多个密码的功能，以后添加相应的功能时这里要进行更改
  }

}

var styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#F5F5F5',
  },
  item:{
    height:40,
    justifyContent: 'center',
    borderTopWidth: Util.pixel,
    borderTopColor: '#ddd',
    backgroundColor:'#fff',
    alignItems:'center',
  },
  font:{
    fontSize:15,
    marginLeft:5,
    marginRight:10,
  },
  wrapper:{
    marginTop:30,
  },
  tag:{
    marginLeft:10,
    fontSize:16,
    fontWeight:'bold'
  }
});
