// 银行卡校验
const verificationBankCard = function(searchText, e){
    var self = this
    // 如果是删除键，则不加空格，且删去字符串末端空格
    if (e.keyCode === 8) {
       self.searchText = self.searchText.replace(/[\s\n\t]+$/g, "");
       return
    }
      self.searchText = self.searchText.replace(/[^0-9|' ']*/g, '');
      var value = self.searchText.replace(/[^0-9]*/g, '');
    if (value.length > 4 && value.length <= 8) {
      self.searchText = value.slice(0, 4) + ' ' + value.slice(4, value.length);
    }
    else if (value.length > 8 && value.length <= 12) {
      self.searchText = value.slice(0, 4) + ' ' + value.slice(4, 8) + ' ' + value.slice(8, value.length);
    }
    else if (value.length > 12 && value.length <= 16) {
      self.searchText = value.slice(0, 4) + ' ' + value.slice(4, 8) + ' ' + value.slice(8, 12) + ' ' + value.slice(12, value.length);
      if (value.length === 16) {
       // 调用识别银行卡函数

      }
    }
    else if (value.length > 16) {
      self.searchText = value.slice(0, 4) + ' ' + value.slice(4, 8) + ' ' + value.slice(8, 12)+ ' ' + value.slice(12, 16) + ' ' + value.slice(16, value.length)
      if (value.length === 19) {
       // 调用识别银行卡函数

      } else if (value.length > 19) {
        self.searchText = value.slice(0, 4) + ' ' + value.slice(4, 8) + ' ' + value.slice(8, 12)+ ' ' + value.slice(12, 16) + ' ' + value.slice(16, 19)
      }
    }
}
export default verificationBankCard;