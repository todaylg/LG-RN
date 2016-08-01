'use strict';
import React, { Component } from 'react'
import AdSupportIOS from 'AdSupportIOS'
import Home from '../views/home'
import About from '../views/about.js'
import Manager from '../views/manager'
import Message from '../views/message'
import Service from '../views/service'//定义路由
import Util  from '../views/util'//发送请求

import {
  StyleSheet,
  View,
  TabBarIOS,
  Text,
  NavigatorIOS,//NavigatorIOS包装了UIKit的导航功能，可以使用左划功能来返回到上一界面。
  AppRegistry,
  Image,
  TextInput,
  ScrollView,
  TouchableHighlight,
  ActivityIndicator,
  AlertIOS,//启动一个提示对话框，包含对应的标题和信息。
  AsyncStorage,//AsyncStorage是一个简单的、异步的、持久化的Key-Value存储系统，它对于App来说是全局性的。它用来代替LocalStorage。
} from 'react-native'


export default class Login extends Component{
  constructor (...args) {
    super(...args)
    this.state = ({
      title: '主页',
      description: '选项卡',
      selectedTab: 'home',
      showIndex: {
        height:0,
        opacity:0
      },
      showLogin:{
        flex:1,
        opacity:1
      },
      isLoadingShow: false
    })
  }
  
  componentDidMount(){
    var that = this;
    //是否登录过了来判断是否显示登录页面
    AsyncStorage.getItem('token', function(err, token){
      if(!err && token){
        var path = Service.host + Service.loginByToken;
        Util.post(path, {
          token: token
        },function(data){
          if(data.status){
            that.setState({
              showLogin: {
                height:0,
                width:0,
                flex:0,
              },
              showIndex:{
                flex:1,
                opacity:1
              },
              isLoadingShow: false
            });
          }
        });
      }else{
        that.setState({
          showIndex: {
            height:0,
            opacity:0
          },
          showLogin:{
            flex:1,
            opacity:1
          },
          isLoadingShow: false
        });
      }
    });

    var path = Service.host + Service.getMessage;
    var that = this;
    console.log('...')
    Util.post(path, {
      key: Util.key
    }, function(data){
      that.setState({
        data: data
      });
    });
  }

  _selectTab(tabName){
    this.setState({
      selectedTab: tabName
    });
  }

  _addNavigator(component, title){
    var data = null;
    if(title === '公告'){
      data = this.state.data;
    }
    return <NavigatorIOS
      style={{flex:1}}
      barTintColor='#007AFF'//导航条的背景颜色。
      titleTextColor="#fff"//导航器标题的文字颜色。
      tintColor="#fff"//导航栏上按钮的颜色。
      translucent={false}//一个布尔值，决定是否导航条是半透明的。
      initialRoute={{
      //NavigatorIOS的第一个路由通过initialRoute属性来提供。
      //现在component会被导航器渲染出来。它可以通过route属性获得对应的路由对象，导航器本身，还有所有passProps中传递的属性。 查看initialRoute的propTypes来了解路由（route）的完整定义
          component: component,
          title: title,
          passProps:{
            data: data
          }
        }}
      />;
  }

  _getEmail=(val)=>{
    var email = val;
    this.setState({
      email: email
    });
  }

  _getPassword=(val)=>{
    var password = val;
    this.setState({
      password: password
    });
  }

  _login=()=>{  
    var email = this.state.email;
    var password = this.state.password;
    var path = Service.host + Service.login;
    var that = this;
    //隐藏登录页 & 加载loading
    this.setState({
      showLogin: {
        height:0,
        width:0,
        flex:0,
      },
      isLoadingShow: true
    });
    //添加广告是什么鬼 
    AdSupportIOS.getAdvertisingTrackingEnabled(function(){
      AdSupportIOS.getAdvertisingId(function(deviceId){
        Util.post(path, {
          email: email,
          password: password,
          deviceId: deviceId,//切换手机时才能识别？
        }, function(data){
          if(data.status){
            var user = data.data;
            //加入数据到本地
            AsyncStorage.multiSet([
              ['username', user.username],
              ['token', user.token],
              ['userid', user.userid],
              ['email', user.email],
              ['tel', user.tel],
              ['partment', user.partment],
              ['tag', user.tag],
            ], function(err){
              if(!err){
                that.setState({//触发的重绘好像是全部的
                  showLogin: {
                    height:0,
                    width:0,
                    flex:0,
                  },
                  showIndex:{
                    flex:1,
                    opacity:1
                  },
                  isLoadingShow: false
                });
              }
            });
          }else{
            AlertIOS.alert('登录', '用户名或者密码错误');
            that.setState({
              showLogin: {
                flex:1,
                opacity:1
              },
              showIndex:{
                height:0,
                width:0,
                flex:0,
              },
              isLoadingShow: false
            });
          }
        });
      }, function(){
        AlertIOS.alert('设置','无法获取设备唯一标识');
      });
    }, function(){
      AlertIOS.alert('设置','无法获取设备唯一标识，请关闭设置->隐私->广告->限制广告跟踪');
    });
  }

  render(){
    return(
      <View style={{flex:1}}>
        {this.state.isLoadingShow ?
          <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <ActivityIndicator size="small" color="#268DFF"></ActivityIndicator>
          </View>:null
        }
        {!this.state.isLoadingShow ?
          <View style={this.state.showIndex}>
            <TabBarIOS barTintColor="#FFF">
              <TabBarIOS.Item
                icon={require('image!phone_s')}//?????
                title="首页"
                selected={this.state.selectedTab === 'home'}
                onPress={this._selectTab.bind(this, 'home')}
                >
                {this._addNavigator(Home, '主页')}
              </TabBarIOS.Item>

              <TabBarIOS.Item
                title="公告"
                icon={require('image!gonggao')}
                selected={this.state.selectedTab === 'message'}
                onPress={this._selectTab.bind(this, 'message')}
                >
                {this._addNavigator(Message, '公告')}
              </TabBarIOS.Item>

              <TabBarIOS.Item
                title="管理"
                icon={require('image!manager')}
                selected={this.state.selectedTab === 'manager'}
                onPress={this._selectTab.bind(this, 'manager')}
                >
                {this._addNavigator(Manager, '管理')}
              </TabBarIOS.Item>

              <TabBarIOS.Item
                title="关于"
                icon={require('image!about')}
                selected={this.state.selectedTab === 'about'}
                onPress={this._selectTab.bind(this, 'about')}
                >
                {this._addNavigator(About, '关于')}
              </TabBarIOS.Item>
            </TabBarIOS>
          </View> : null
        }
        <ScrollView style={[this.state.showLogin]}>
          <View style={styles.container}>
            <View>
              <Image style={styles.logo} source={require('image!logo')}></Image>
            </View>

            <View style={styles.inputRow}>
              <Text>邮箱</Text><TextInput style={styles.input} placeholder="请输入邮箱" onChangeText={this._getEmail}/>
            </View>
            <View style={styles.inputRow}>
              <Text>密码</Text><TextInput style={styles.input} placeholder="请输入密码" password={true} onChangeText={this._getPassword}/>
            </View>

            <View>
              <TouchableHighlight underlayColor="#fff" style={styles.btn} onPress={this._login}>
                <Text style={{color:'#fff'}}>登录</Text>
              </TouchableHighlight>
            </View>
          </View>
        </ScrollView>

      </View>
    );
  }

}

var styles = StyleSheet.create({
  container:{
    marginTop:50,
    alignItems:'center',
  },
  logo:{
    width:100,
    height:100,
    resizeMode: Image.resizeMode.contain
  },
  inputRow:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'center',
    marginBottom:10,
  },
  input:{
    marginLeft:10,
    width:220,
    borderWidth:Util.pixel,
    height:35,
    paddingLeft:8,
    borderRadius:5,
    borderColor:'#ccc'
  },
  btn:{
    marginTop:10,
    width:80,
    height:35,
    backgroundColor:'#3BC1FF',
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 4,
  }
});

