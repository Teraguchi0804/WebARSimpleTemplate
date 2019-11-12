/**
 * setUpBtnLine
 * @param $btn
 * @param text
 * @param shareURL
 */
export default ($btn, text, shareURL = '') => {
  var url;
  if (shareURL == null) {
    shareURL = '';
  }
  url = 'http://line.me/msg/text/?';
  if (shareURL === '') {
    url += "" + (encodeURIComponent(text));
  } else {
    url += (encodeURIComponent(text)) + "\n" + (encodeURIComponent(shareURL));
  }
  return $btn.on('click', function(e) {
    window.open(url, 'lineShare');
    return false;
  });
}