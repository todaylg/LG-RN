
var fs = require("fs");

module.exports = function(app){
  var FS_PATH_SERVICES = './routes/services/';
  var REQUIRE_PATH_SERVICES = './services/';


  fs.readdir(FS_PATH_SERVICES, function(err, list){
    if(err){
      throw '没有找到该文件夹，请检查......'
    }
    //路由只管分配，不管controller
    for (var e; list.length && (e = list.shift());){//shift() 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。就是一个一个来啦
      var service = require(REQUIRE_PATH_SERVICES + e);
      service.init && service.init(app);
    }
  });
};