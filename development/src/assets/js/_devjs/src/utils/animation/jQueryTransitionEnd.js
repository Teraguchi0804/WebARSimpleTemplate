/**
 * jQueryTransitionEnd
 * @param namescape
 * @returns {*}
 */
export default (namescape) => {
  if (namescape == null) {
    namescape = '';
  }
  if (namescape) {
    return "transitionend." + namescape + " webkitTransitionEnd." + namescape + " mozTransitionEnd." + namescape + " oTransitionEnd." + namescape;
  } else {
    return 'transitionend webkitTransitionEnd mozTransitionEnd oTransitionEnd';
  }
}