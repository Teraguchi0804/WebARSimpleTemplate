/**
 * setUpBtnTwitter
 * @param $btn
 * @param text
 * @param shareURL
 */
export default ($btn, text, shareURL) => {
  var url;
  if (shareURL == null) {
    shareURL = '';
  }
  url = 'https://twitter.com/intent/tweet?';
  if (shareURL === '') {
    url += "text=" + (encodeURIComponent(text));
  } else {
    url += "url=" + (encodeURIComponent(shareURL)) + "&text=" + (encodeURIComponent(text));
  }
  return $btn.on('click', function(e) {
    window.open(url, 'twitterShare', 'width=670,height=400');
    return false;
  });
}