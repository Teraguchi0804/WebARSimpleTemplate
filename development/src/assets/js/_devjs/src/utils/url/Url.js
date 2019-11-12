/**
 * fileOverview: urlから値取得、取得した値を操作する系
 * Project:
 * File: Url
 * Date:
 * Author:
 */

export default class Url {

  constructor() {

  }

  /**
   * クエリ抜き出し
   * @returns {*}
   */
  getParam() {

    var url = location.href;
    var param = url.split('?')[1];
    if (param==undefined) return undefined;
    var paramItems = param.split('&');
    var list = {};
  
    for( var i = 0; i<paramItems.length; i++ ){

        paramItem = paramItems[i].split('=');
        list[paramItem[0]] = paramItem[1];

    }

    return list;

  }

  /**
   * ハッシュ取得 : location.hashの#を削除したやつを取得
   * @returns {string}
   */
  hash() {

    return location.hash.replace("#", "");

  }

  /**
   * getHash
   * @returns {string}
   */
  getHash () {

    return location.hash

  }

  /**
   * setHash
   * @param text
   */
  setHash (text) {

    location.hash = text;

  }

  /**
   * checkCookie : 指定したstringがクッキーにセットされていたらtrue
   * @param str
   * @returns {*}
   */
  checkCookie(str) {

    var flag = null;

    if ($.cookie(str) == undefined || $.cookie(str) == '') flag = false;
    else flag = true;

    return flag;

  }

  /**
   * setCookie
   * @param str
   */
  setCookie(str) {

    var date = new Date();
    // date.setTime( date.getTime() + ( 30 * 1000 )); //30秒
    date.setTime( date.getTime() + ( 15 * 60 * 1000 )); //15分

    $.cookie(str, true, { expires: date, path: '/' });

  }

  /**
   * protcol
   * @returns {string}
   */
  protocol() {

    return location.protocol;

  }

  /**
   * host
   * @returns {string}
   */
  host() {

    return location.hostname;

  }

  /**
   * port
   * @returns {string}
   */
  port() {

    return location.port;

  }

  /**
   * path
   * @returns {string}
   */
  path() {

    return location.pathname;

  }

}