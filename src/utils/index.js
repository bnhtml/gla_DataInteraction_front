export const debounce = function(fn, delay) {
    // 维护一个 timer
    let timer = null;

    return function () {
      // 通过 ‘this’ 和 ‘arguments’ 获取函数的作用域和变量
      let context = this;
      let args = arguments;

      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    }
  }
  export const getrandom = function(id ,num = 1000, start = 1, isArray ){
    function random(num = 1000, start = 0){
      return parseInt(Math.random() * num + start);
    }

    function randomarr() {
      let leng = start || 5;
      let total = num || 100;
      let arr = [];
      for (let i = 0; i < leng; i++) {
        if (i === leng - 1) {
          arr.push(total);
          break;
        }
        let size = random(total * 2 / leng, 1);
        arr.push(size);
        total -= size;
      }
      return arr;
    };
    if(id){
      let returndata = isArray ? randomarr() : random(num, start);
      let data = JSON.parse(localStorage.getItem('$DATABASE')) || {};
      let path = this.$route.path;
      if (data[path]) {
        if(typeof data[path][id] === 'undefined'){
          data[path][id] = returndata;
        }
      }else{
        data[path] = { [id]: returndata};
      }
      
      localStorage.setItem('$DATABASE', JSON.stringify(data))
      return data[path][id];
    }else{
      return returndata;
    }
  }
  export const numberFormat = (number, decimals = 0, dec_point = '.', thousands_sep = ',') => {
  /*
   3     * 参数说明：
   4     * number：要格式化的数字
   5     * decimals：保留几位小数
   6     * dec_point：小数点符号
   7     * thousands_sep：千分位符号
   8     * */
  number = (number + '').replace(/[^0-9+-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.ceil(n * k) / k;

    };
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  var re = /(-?\d+)(\d{3})/;
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, "$1" + sep + "$2");

  }

  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');

  }
  return s.join(dec);
}


/****过滤数据中的null***/
/*传入obj 返回过滤null后的对象*/
function isObject(o) {
  return Object.prototype.toString.call(o).indexOf('Object') > -1
}

function isArray(o) {
  return Object.prototype.toString.call(o).indexOf('Array') > -1
}

export function dataFilter(obj) {
  if (isObject(obj) || isArray(obj)) {
    var newObj = isObject(obj) ? {} : []
    for (var name in obj) {
      if (obj.hasOwnProperty(name)) {
        if (obj[name] !== null && obj[name] !== undefined) {
          newObj[name] = obj[name]
        }
        if (isObject(obj[name]) || isArray(obj[name])) {
          newObj[name] = dataFilter(obj[name])
        }
      }
    }
    return newObj
  }
}
