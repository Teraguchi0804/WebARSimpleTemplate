/**
 * fileOverview:
 * Project:
 * File: loadingUtil
 * Date: 18/8/21
 * Author: Teraguchi
 */

'use strict';


export default class loadingUtil {

  constructor(){

		this.$loadingContainer = $("#loadingContainer");
		this.DOMInit = this._DOMInit.bind(this);
		this.disappear = this._disappear.bind(this);

		this.setup();
		this.setEvents();

  }

	setup() {

		this.DOMInit();

	}

	/**
	 * DOMの初期化
	 * @private
	 */
	_DOMInit() {

  	TweenMax.set(this.$loadingContainer,{display:"block", opacity:"1.0"});

	}

	/**
	 * ローディングレイヤーを非表示
	 * @private
	 */
	_disappear() {

		TweenMax.to(this.$loadingContainer, 0.4, {
			display:"none",
			opacity: "0.0",
			ease: Power2.easeInOut
		});

	}

	onLoad() {

	}

	setEvents() {

		$(window).on('load', this.onLoad.bind(this));

	}

}