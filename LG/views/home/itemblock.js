import React, { Component } from 'react'
import {
 View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native'
import Address from'./address'
import Service from'./../service'
import Util from'../util'


//每个单项组件
export default class ItemBlock extends Component{
  render(){
    var size ={
      width: parseInt(this.props.width),
      height: parseInt(this.props.width),
      backgroundColor: this.props.color,
    };
    return (
      <TouchableHighlight underlayColor="#fff" onPress={this._loadPage.bind(this)}>
        <View style={[styles.itemBlock, size]}>
          <View>
            <Text style={styles.font18}>{this.props.title}</Text>
          </View>
          <View>
            <Text style={styles.font10}>{this.props.partment}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
  //加载页面
  _loadPage(e){
    var nav = this.props.nav;
    var key = Util.key;
    var partment = this.props.partment;
    var path = Service.host + Service.getUser;

    Util.post(path, {
      key: key,
      partment : partment
    }, function(data){
      nav.push({
        title: this.props.title,
        component: Address,
        passProps:{
          data: data
        }
      });
    }.bind(this));
  }
}

var styles = StyleSheet.create({
  itemBlock:{
    justifyContent:'center',
    alignItems:'center',
    borderRadius:5,
    marginLeft:10,
  },
  font18:{
    color:'#fff',
    fontSize:18,
    fontWeight:'500',
  },
  font10:{
    color:'#fff',
    fontSize:10,
  },
});
