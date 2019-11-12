/**
 * preloadImg
 * @param imgPath
 * @returns {Promise}
 */
export default (imgPath) => {
  return new Promise(function(resolve) {
    var img;
    img = new Image();
    img.addEventListener('load', function(e) {
      img.removeEventListener('load', arguments.callee);
      return resolve();
    });
    return img.src = imgPath;
  });
}