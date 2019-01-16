
/**
 * 获取客户端
 */
import appBase from '../common/app_base';
var appClient = {
  getClientId:function(){
    return this.getNavigatorUserAgent() + this.getScreenWidth() + "W" + this.getScreenHeight() + "Y" + this.getColorDepth();
  },
  getClient:function(){
    var clientId = this.getClientId();
    //clientId = clientId.split('(').join('|').split(')').join('|').replace(' ','');
    if (clientId.length > 0 && clientId.length >= 256){
      clientId = clientId.substring(0,255);
    }
    //console.log("======clientId===" + clientId.length +"======" + clientId);
    //appBase.getRsaCoder().encrypt(CryptoJS.enc.Base64.parse(clientId));
    var code = encodeURIComponent(encodeURIComponent(appBase.getRsaCoder().encryptLong(clientId)));
    // console.log("=======" + code)
    return code;
  },
  getNavigatorUserAgent:function(){
    return navigator.userAgent;
  },
  getScreenWidth: function () {//显示器像素宽
    return window.screen.width;
  },
  getScreenHeight: function () {//显示器像素高
    return window.screen.height;
  },
  getColorDepth: function () {//显示器颜色深度
    return window.screen.colorDepth;
  },
  getFontSmoothing: function () {//显示器字体
    return window.screen.fontSmoothingEnabled;
  },

  getActionUserPassword:function (pwd) {
    var value = pwd + "@_@" + this.getClientId();
    var encryptPwd = appBase.getRsaCoder().encryptLong(value);
    //console.log("==========" + encryptPwd)
    var clientPwd = encodeURIComponent(encodeURIComponent(encryptPwd));
    return clientPwd;
  }

};
export default appClient;

