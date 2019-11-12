/**
 * capitalize : 先頭の文字を大文字に変換
 * @param txt
 * @returns {string}
 */
export default (txt) => {
  return txt.charAt(0).toUpperCase() + txt.slice(1);
}