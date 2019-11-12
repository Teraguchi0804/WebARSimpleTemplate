/**
 * fileOverview:
 * Project:
 * File: lottieUtil
 * Date: 18/8/21
 * Author: Teraguchi
 */

'use strict';


export default class lottieUtil {

  constructor(elm, dataPath, speedVal){

		this.elm = elm;
		this.dataPath = dataPath;
		this.speedVal = speedVal;
		this.anim = null;

		this.play = this._play.bind(this);
		this.stop = this._stop.bind(this);
		this.pause = this._pause.bind(this);
		this.destory = this._destory.bind(this);
		this.setSpeed = this._setSpeed.bind(this);

		this.setup();

  }

	setup() {

		this.anim = lottie.loadAnimation({
			container: document.getElementById(this.elm),
			renderer: 'svg',
			loop: true,
			autoplay: false,
			path: this.dataPath
		});

	}

	/**
	 * 再生
	 * @private
	 */
	_play() {
		this.anim.play();
	}

	/**
	 * 停止
	 * @private
	 */
	_stop() {
		this.anim.stop();
	}

	/**
	 * 一時停止
	 * @private
	 */
	_pause() {
		this.anim.pause();
	}

	/**
	 * 破棄
	 * @private
	 */
	_destory() {
		this.anim.destroy();
	}

	/**
	 * 再生スピード設定
	 * @param int
	 * @private
	 */
	_setSpeed(int) {
		this.anim.setSpeed(int);
	}


}