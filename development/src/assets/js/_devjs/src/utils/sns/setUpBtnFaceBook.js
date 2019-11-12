/**
 * setUpBtnFacebook
 * @param $btn
 * @param shareURL
 * @param description
 */
export default ($btn, shareURL, description = '') => {
  var url;
  if (description == null) {
    description = '';
  }
  url = 'https://www.facebook.com/sharer/sharer.php?&display=popup&u=';
  url += "" + (encodeURIComponent(shareURL));
  if (description) {
    url += "&description=" + (encodeURIComponent(description));
  }
  return $btn.on('click', function(e) {
    window.open(url, "facebookShare" + (new Date().getTime()), 'width=670,height=400');
    return false;
  });
}