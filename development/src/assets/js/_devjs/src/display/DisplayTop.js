/**
 * fileOverview:
 * Project:
 * File: DisplayTop
 * Date: 19/06/27
 * Author: Teraguchi
 */

'use strict';

import checkClient from "../utils/ua/checkClient";
import glStage from "../three/glStage";

const EventEmitter = require('events').EventEmitter;
window.EVENT = {
	LOAD_COMP : 'load_comp',
};

export default class DisplayTop {

	constructor() {

		this.isUA = true;
		this.checkClient = new checkClient();
		this.checkUA = this._checkUA.bind(this);
		window.emiter = new EventEmitter();
		this.attachEmitEvent = this._attachEmitEvent.bind(this);

		this.clickEvent = this._clickEvent.bind(this);
		this.onResize = this._onResize.bind(this);

		this.isWebGLPossible = true;
		this.stage = null;

		this.setup();
		this.setEvents();

	}

	setup() {

		this.checkUA();
		this.attachEmitEvent();

		window.addEventListener('resize', this.onResize);

		// 複数指による拡大縮小を禁止
		document.addEventListener('touchstart', event => {
			if (event.touches.length > 1) {
				event.preventDefault();
			}
		}, true);

	}

	/**
	 * UAチェック
	 * @private
	 */
	_checkUA() {

		if(this.checkClient.isMobile() || this.checkClient.isTablet()) {
			// SP & Tab
			this.isUA = false;
		} else if(!this.checkClient.isMobile() || !this.checkClient.isTablet()) {
			// PC
			this.isUA = true;
		}

	}

	/**
	 * EventEmitterイベントアサイン
	 * @private
	 */
	_attachEmitEvent() {
		window.emiter.on(EVENT.LOAD_COMP, () => {
			if(this.isEnv) {
				TweenMax.to(".btnPlay", 0.8, {
					opacity: 1.0,
					display: "block",
					ease: Power2.easeInOut,
				});

			} else {

			}
		});
	}

	/**
	 * ランドスケープチェック
	 * @private
	 */
	_checkOrientation() {
		$(window).on('orientationchange', (evt) => {
			let angle;
			angle = screen && screen.orientation && screen.orientation.angle;
			if (angle == null) {
				angle = window.orientation || 0;
			}
			if(angle % 180 !== 0) {

			} else {

			}
		}).trigger('orientationchange');
	}

	/**
	 * クリックイベント
	 * @private
	 */
	_clickEvent() {

	}

	/**
	 * リサイズイベント
	 * @private
	 */
	_onResize() {
		// this.stage.onResize();
	}

	onLoad() {
		this.clickEvent();

		if(this.isWebGLPossible) {
			this.stage = new glStage();
			this.stage.setup();
			this.stage.render();
			this.stage.clickEvent();
		}

		if(this.isUA) {}
		else if(!this.isUA){}

	}

	setEvents() {
		let that = this;
		$(window).on('load', this.onLoad.bind(this));
		// DOMContentLoaded イベントの代替
		document.onreadystatechange = function () {
			if(document.readyState === 'interactive') {
				// window.console.log("interactive!!");
			} else if (document.readyState === 'complete') {
				// window.console.log("complete!!");
			}
		}

	}

}
