/**
 * fileOverview: 配列の操作系
 * Project:
 * File: Array
 * Date:
 * Author:
 */
export default class Array {

  constructor() {


  }

	/**
	 * 配列内のランダムな値をひとつ取得
	 * @param arr : 配列
	 * @returns {*} : 配列内の値
	 */
  arrRand(arr) {

    return arr[this.random(0, arr.length - 1)];

  }

	/**
   * 配列をランダムに並べ替え
	 * @param arr : 配列(Array)
	 * @returns {Array}
	 */
  shuffle(arr) {

    let Arr = [];
    Arr = arr.slice();
    var i = arr.length;
    while(i){
      var j = Math.floor(Math.random()*i);
      var t = Arr[--i];
      Arr[i] = Arr[j];
      Arr[j] = t;
    }
    return Arr;

  }

}