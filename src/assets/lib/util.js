/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
export function find(list, f) {
  return list.filter(f)[0]
}

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
export function deepCopy(obj, cache = []) {
  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // if obj is hit, it is in circular structure
  const hit = find(cache, c => c.original === obj)
  if (hit) {
    return hit.copy
  }

  const copy = Array.isArray(obj) ? [] : {}
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy
  })

  Object.keys(obj).forEach(key => {
    copy[key] = deepCopy(obj[key], cache)
  })

  return copy
}

/**
 * forEach for object
 */
export function forEachValue(obj, fn) {
  Object.keys(obj).forEach(key => fn(obj[key], key))
}

export function isObject(obj) {
  return obj !== null && typeof obj === 'object'
}

export function isPromise(val) {
  return val && typeof val.then === 'function'
}

export function assert(condition, msg) {
  if (!condition) throw new Error(`[vuex] ${msg}`)
}
export function isEmptyObject(obj) {
  for (var name in obj) {
    return false;
  }
  return true;
}
/**
 * 根据对象的某个属性查找该对象是否存在于数组
 * @param {*查找的数组} arrayToSearch
 * @param {*属性名称} attr
 * @param {*属性值} val
 */
export function findElemInArray(arrayToSearch, attr, val) {
  for (var i = 0; i < arrayToSearch.length; i++) {
    if (arrayToSearch[i][attr] == val) {
      return i;
    }
  }
  return -1;
}
/**
 * 对象拷贝；方式二：JSON.parse(JSON.stringify(obj))
 * @param {*需要拷贝的对象} value
 * @param {*true深拷贝} isDeep
 */
export function clone(value, isDeep) {
  if (value === null) return null;
  if (typeof value !== 'object') return value
  if (Array.isArray(value)) {
    if (isDeep) {
      return value.map(item => clone(item, true))
    }
    return [].concat(value)
  } else {
    if (isDeep) {
      var obj = {};
      Object.keys(value).forEach(item => {
        obj[item] = clone(value[item], true)
      })
      return obj;
    }
    return { ...value }
  }
}
/**
 * 金额转大写 money2Chinese(1234) // 壹仟贰佰叁拾肆元整
 * @param {*} num
 */
export function money2Chinese(num) {
  if (typeof num) throw new Error('参数为数字')
  let strOutput = ""
  let strUnit = '仟佰拾亿仟佰拾万仟佰拾元角分'
  num += "00"
  const intPos = num.indexOf('.')
  if (intPos >= 0) {
    num = num.substring(0, intPos) + num.substr(intPos + 1, 2)
  }
  strUnit = strUnit.substr(strUnit.length - num.length)
  for (let i = 0; i < num.length; i++) {
    strOutput += '零壹贰叁肆伍陆柒捌玖'.substr(num.substr(i, 1), 1) + strUnit.substr(i, 1)
  }

  return strOutput.replace(/零角零分$/, '整').replace(/零[仟佰拾]/g, '零').replace(/零{2,}/g, '零').replace(/零([亿|万])/g, '$1').replace(/零+元/, '元').replace(/亿零{0,3}万/, '亿').replace(/^元/, "零元");
}

/**
 * 日期格式化
 * @param {*} value
 * @param {*} fmt 默认 yyyy-MM-dd HH:mm:ss
 */
export function dateFormat(value, fmt) {
  if (!value) return "";
  value += "";
  if (value.length == 10) {
    value = value * 1000;
  } else if (value.indexOf("T") > 0) {
    value = value.replace("T", " ");
    return value;
  }
  var date = new Date(value);
  if (fmt == undefined) {
    fmt = "yyyy-MM-dd hh:mm:ss";
  }
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
}
/**
 * var guid = new GUID();
 * alert(guid.newGUID());
 */
export function GUID() {
  this.date = new Date();   /* 判断是否初始化过，如果初始化过以下代码，则以下代码将不再执行，实际中只执行一次 */
  if (typeof this.newGUID != 'function') {   /* 生成GUID码 */
    GUID.prototype.newGUID = function () {
      this.date = new Date(); var guidStr = '';
      var sexadecimalDate = this.hexadecimal(this.getGUIDDate(), 16);
      var sexadecimalTime = this.hexadecimal(this.getGUIDTime(), 16);
      for (var i = 0; i < 9; i++) {
        guidStr += Math.floor(Math.random() * 16).toString(16);
      }
      guidStr += sexadecimalDate;
      guidStr += sexadecimalTime;
      while (guidStr.length < 32) {
        guidStr += Math.floor(Math.random() * 16).toString(16);
      }
      return this.formatGUID(guidStr);
    }
    /* * 功能：获取当前日期的GUID格式，即8位数的日期：19700101 * 返回值：返回GUID日期格式的字条串 */
    GUID.prototype.getGUIDDate = function () {
      return this.date.getFullYear() + this.addZero(this.date.getMonth() + 1) + this.addZero(this.date.getDay());
    }
    /* * 功能：获取当前时间的GUID格式，即8位数的时间，包括毫秒，毫秒为2位数：12300933 * 返回值：返回GUID日期格式的字条串 */
    GUID.prototype.getGUIDTime = function () {
      return this.addZero(this.date.getHours()) + this.addZero(this.date.getMinutes()) + this.addZero(this.date.getSeconds()) + this.addZero(parseInt(this.date.getMilliseconds() / 10));
    }
    /* * 功能: 为一位数的正整数前面添加0，如果是可以转成非NaN数字的字符串也可以实现 * 参数: 参数表示准备再前面添加0的数字或可以转换成数字的字符串 * 返回值: 如果符合条件，返回添加0后的字条串类型，否则返回自身的字符串 */
    GUID.prototype.addZero = function (num) {
      if (Number(num).toString() != 'NaN' && num >= 0 && num < 10) {
        return '0' + Math.floor(num);
      } else {
        return num.toString();
      }
    }
        /*  * 功能：将y进制的数值，转换为x进制的数值 * 参数：第1个参数表示欲转换的数值；第2个参数表示欲转换的进制；第3个参数可选，表示当前的进制数，如不写则为10 * 返回值：返回转换后的字符串 */GUID.prototype.hexadecimal = function (num, x, y) {
      if (y != undefined) { return parseInt(num.toString(), y).toString(x); }
      else { return parseInt(num.toString()).toString(x); }
    }
    /* * 功能：格式化32位的字符串为GUID模式的字符串 * 参数：第1个参数表示32位的字符串 * 返回值：标准GUID格式的字符串 */
    GUID.prototype.formatGUID = function (guidStr) {
      var str1 = guidStr.slice(0, 8) + '-', str2 = guidStr.slice(8, 12) + '-', str3 = guidStr.slice(12, 16) + '-', str4 = guidStr.slice(16, 20) + '-', str5 = guidStr.slice(20);
      return str1 + str2 + str3 + str4 + str5;
    }
  }
}
/**
 * 有效手机号验证
 * @param {*} str
 */
export function isPoneNumber(str) {
  var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
  if (!myreg.test(str)) {
    return false;
  } else {
    return true;
  }
}

/**
 * 获取会员转账状态同时进行跳转显示
 * @param _this 调用的上下文
 */
// export function getMemberTransferState(_this) {
//   _this.mLoading(true, "请稍等，处理中...");
//   _this.$http.get(`${_this.cApi}/memberUser/membercoin.json`).then(result => {
//     if (result.code == 0) {
//       if (result.data >= 0) {
//         this.mWinOpen(
//           "会员转账",
//           () => import("@/components/usercenter/memberTransfer"),
//           {},
//           400
//         );
//       } else if (result.data == -1) {
//         _this.mWinOpen(
//           "请先完善资金密码",
//           () => import("@/components/usercenter/coinpassword"),
//           {},
//           400
//         );
//         /* this.mAlert("请先设置资金密码", () => {

//         }); */
//       } else if (result.data == -2) {
//         _this.mAlert("请先绑定银行卡", () => {
//           _this.mWinOpen(
//             "绑定银行卡",
//             () => import("../components/usercenter/bindBankCard"),
//             {},
//             600
//           );
//         });
//       }
//     }
//   });
// }
