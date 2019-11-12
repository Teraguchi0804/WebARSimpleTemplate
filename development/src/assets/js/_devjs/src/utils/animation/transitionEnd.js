/**
 * transitionEnd
 * @returns {*}
 */
export default () => {
  var el, key, transitions, value;
  el = document.createElement('p');
  transitions = {
    transition: 'transitionend',
    OTransition: 'oTransitionEnd',
    MozTransition: 'transitionend',
    WebkitTransition: 'webkitTransitionEnd'
  };
  for (key in transitions) {
    value = transitions[key];
    if (el.style[key] != null) {
      return transitions[key];
    }
  }
  return 'transitionend';
})();