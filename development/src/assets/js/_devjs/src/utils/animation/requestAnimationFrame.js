/**
 * requestAnimationFrame
 */
window.requestAnimationFrame = ((function(_this) {
  return function() {
    return window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
          return setTimeout(callback, 1000 / 30);
        };
  };
})(this))();