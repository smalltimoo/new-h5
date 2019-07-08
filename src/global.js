/**
 * 函数防抖 (只执行最后一次点击)
 * @param fn
 * @param delay
 * @returns {Function}
 * @constructor
 */
export const Debounce = (fn, t) => {
  let delay = t || 500;
  let timer;
  return function () {
    let args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, args);
    }, delay);
  }
};
/**
 * 函数节流
 * @param fn
 * @param interval
 * @returns {Function}
 * @constructor
 */
export const Throttle = (fn, t) => {
  let last;
  let timer;
  let interval = t || 500;
  return function () {
    let args = arguments;
    let now = +new Date();
    if (last && now - last < interval) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        last = now;
        fn.apply(this, args);
      }, interval);
    } else {
      last = now;
      fn.apply(this, args);
    }
  }
};

// 观察者模式
export const Observer = (function () {
  let __messages = {};
  return {
    regist: function (type, fn) {
      if (typeof __messages[type] === 'undefined') {
        messages[type] = [fn];
      } else {
        __messages[type].push(fn);
      }
    },
    fire: function (type, args) {
      if (!__messages[type]) {
        return
      }
      let events = {
          type: type,
          args: args || {}
        },
        i = 0,
        len = __messages[type].length;
      for (; i < len; i++) {
        __messages[type][i].call(this, events);
      }
    },
    remove: function (type, fn) {
      if (__messages[type] instanceof Array) {
        let i = __messages[type].length - 1;
        for (; i >= 0; i--) {
          __messages[type][i] === fn && __messages[type].splice(i, 1)
        }
      }
    }
  }
})();

// 模板渲染方法
export const formatString = (str, data) => {
  return str.replace(/\{\{(\w+)\}\}/g, function (match, key) {
    return typeof data[key] === undefined ? '' : data[key]
  })
}

// 冒泡排序
export const bubbleSort = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
      }
    }
  }
  return arr;
}

// 置换函数
export const swap = (arr, indexA, indexB) => {
  [arr[indexA], arr[indexB]] = [arr[indexB], arr[indexA]];
}

// 数组去重
export const distinct = (arr = []) => {
  return [...new Set(arr)]
}
// 判断传入的日期与今天比较
export const diffcurrentday = function (str) {
  var d = new Date(str.replace(/-/g, "/"));
  var todaysDate = new Date();
  let diff = d.setHours(0, 0, 0, 0) - todaysDate.setHours(0, 0, 0, 0)
  return diff ===0?'today':diff>0?'after':'before'
}