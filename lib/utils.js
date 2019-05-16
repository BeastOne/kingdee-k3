/**
 * Utilities.
 */
"use strict";

var
  _ = require('lodash');

module.exports.assign = function (object, source) {
  if (source) {
    for (var key in source) {
      if (_.has(object, key)) {
        if (_.isObject(source[key])) {
          this.assign(object[key], source[key]);
        } else {
          object[key] = source[key];
        }
      }
    }
  }

  return object;
};

module.exports.date2Str = function (date, fmt) {
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
};

module.exports.filter2Str = function (filter) {
  var result = '';

  if (filter) {
    for (var key in filter) {
      var value = filter[key];
      if (_.isObject(value)) {
        switch (value.c) {
          case 'like':
            result = result + key + " like \'%" + value + "%\' and ";
            break;
        }
      } else {
        result = result + key + "=\'" + value + "\' and ";
      }
    }

    result = result.substr(0, result.length - 5);
  }

  return result;
};