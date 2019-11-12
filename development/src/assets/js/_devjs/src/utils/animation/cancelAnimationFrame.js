/**
 * cancelAnimationFrame
 */
window.cancelAnimationFrame = ((function(_this) {
  return function() {
    return window.cancelAnimationFrame || window.mozCancelAnimationFrame || function(id) {
          return clearTimeout(id);
        };
  };
})(this))();