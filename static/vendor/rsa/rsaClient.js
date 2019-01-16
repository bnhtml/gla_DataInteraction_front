"use strict";
;(function (root, factory) {
	if (typeof exports === "object") {
		// CommonJS
		module.exports = window.exports = factory();
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define([], factory);
	}
	else {
		root.RSAClient = factory();
	}
}(this, function () {
    var PUBLICKEY ="MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCWjBfaAUFuRrQKvgdQhS3yQykpbnmOqgkA5BdOXccQVFahzeMItXvsQpIrpzZ/we5JXoytb9+EbBxec8bpYtx6NIvBszAMZpuowxZdNtN28RNYHEHGcH6HUMWjqsnQ3Olxrs3gUB0G/VulG4zSluEpyU0DAh5NVMt/QEQwuBfNXwIDAQAB";
var RSAClient = function () {
    this.encryptObj = new JSEncrypt();//{ default_key_size: 2048 }
    this.decryptOjb = new JSEncrypt();
     //this.decrypt.setPrivateKey();
    this.encryptObj.setPublicKey('-----BEGIN PUBLIC KEY-----' + PUBLICKEY + '-----END PUBLIC KEY-----');
};

/**
 * Encrypt text with AES encryption
 * @param {string} plainText text to encrypt
 */
RSAClient.prototype.encrypt = function (plainText) {
    return this.encryptObj.encrypt(plainText);
};
RSAClient.prototype.encryptLong = function (plainText) {
    return this.encryptObj.encryptLong(plainText);
};
RSAClient.prototype.getPublicKey=function(){
    return this.encryptObj.getPublicKey();
}


/**
 * Decrypt text with AES encryption
 * @param {string} cipherText - encrypted text
 */
RSAClient.prototype.decrypt = function (cipherText) {
    return this.decryptOjb.decrypt(cipherText);
};
/**
*验证签名
*/
RSAClient.prototype.verify= function (plainText,sign) {
  var cipherParams = CryptoJS.lib.CipherParams.create({
    ciphertext: CryptoJS.enc.Base64.parse(cipherText)
  });
  var decrypted = CryptoJS.AES.decrypt(
      cipherParams,
      this.key,
      { iv: this.ivHex });
  return decrypted.toString(CryptoJS.enc.Utf8);
};
return RSAClient;
}));
