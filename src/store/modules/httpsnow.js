import types from "../mutation-types";
function apiGet(url,callback,callback2){
  var aryurl = url.split(",")
  for(var i = 0; i<aryurl.length; i++ ){
    if(aryurl[i] == ''){
      continue;
    }
    var listStr = localStorage.getItem(types.BASE_URL_LIST)
    if (!listStr || listStr == '[]') {
      ajaxPost ( aryurl[i]+'/memberApiList.json' ,
          null , true , callback , callback2 )//异步
    }else{
      break;
    }
  }
    // var urllinshi = ['http://192.168.0.168:8083']
    // localStorage.setItem(types.BASE_URL_LIST, JSON.stringify(urllinshi))
}
export {apiGet}
// ajax 对象
function ajaxObject() {
  var xmlHttp;
  try {
    // Firefox, Opera 8.0+, Safari
    xmlHttp = new XMLHttpRequest();
  }
  catch (e) {
    // Internet Explorer
    try {
      xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      try {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (e) {
        alert("您的浏览器不支持AJAX！");
        return false;
      }
    }
  }
  return xmlHttp;
}

// ajax post请求：
function ajaxPost ( url , data , bAsync , callback , callback2 ) {
  var ajax = ajaxObject();
  ajax.open( "post" , url , bAsync );
  ajax.setRequestHeader( "Content-Type" , "application/x-www-form-urlencoded" );
  ajax.onreadystatechange = function () {
    if( ajax.readyState == 4 ) {
      if( ajax.status == 200 ) {
        var listStr = localStorage.getItem(types.BASE_URL_LIST)
        if (!listStr || listStr == '[]') {
        // fnSucceed( ajax.responseText );
        var obj = JSON.parse(ajax.responseText);

          if(obj.code == 0){
            localStorage.setItem(types.BASE_URL_LIST, obj.data)
            callback(types.CHANGE_URL);
            callback(types.BASE_URL);
            callback2(types.SYSTEM_UPDATE)
          }

        }
      }
      else {
        // fnFail( "HTTP请求错误！错误码："+ajax.status );
      }
    }
    else {
      // fnLoading();
    }
  }
  try
  {
    ajax.send( data );
    // ajax.abort();
  }
  catch (e)
  {
    return false
  }
  return false;

}
