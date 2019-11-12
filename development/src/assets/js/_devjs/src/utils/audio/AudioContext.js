/**
 * AudioContext
 */
export default () => {

  window.AudioContext = window.AudioContext || window.webkitAudioContext;

}