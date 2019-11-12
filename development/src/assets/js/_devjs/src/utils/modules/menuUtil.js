/**
 * fileOverview:
 * Project:
 * File: menuUtil
 * Date: 18/8/17
 * Author: Teraguchi
 */


'use strict';

import checkClient from "./ua/checkClient";

export default class menuUtil {

  constructor(){

		this.isUA = true;
		this.checkClient = new checkClient();
		this.checkUA = this._checkUA.bind(this);

		this.clickEvent = this._clickEvent.bind(this);
		this.menuEvent = this._menuEvent.bind(this);


		this.setup();
		this.setEvents();

  }


	setup() {

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
	 *
	 * @private
	 */
	_clickEvent() {
		
		let that = this;

		let _click = (window.ontouchstart === undefined)? 'click' : 'touchstart';
		$(document).on(_click, ".btnMenu", this.menuEvent);

		//通常のクリック時
		$('#navContentSp a[href^="#"]').click(function() {
			//ページ内リンク先を取得
			let href= $(this).attr("href");
			
			//リンク先が#か空だったらhtmlに
			let hash = href == "#" || href == "" ? 'html' : href;

			const page = $('body').data('id');
			if(page == 'top'){

				$(".menu-line").toggleClass('is-open');
				this.modalFlag = false;
				TweenMax.to('#navContentSp', 0.4, {
					display: "none",
					opacity: 0.0,
					ease: Power2.easeInOut,
					onComplete: function () {
						//スクロール実行
						scrollToAnkerSP(hash);
						
					}
				});

			} else if(page != 'top') {

				scrollToAnkerSP(hash);

			}

			//リンク無効化
			return false;

		});

		function scrollToAnkerSP(hash) {
			let target = $(hash);
			let position = target.offset().top - 70;
			$('body,html').stop().animate({ scrollTop:position }, 500);
		}


	}

	/**
	 *
	 * @private
	 */
	_menuEvent() {

		$(".menu-line").toggleClass('is-open');
		if($(".menu-line").hasClass('is-open')) {
			this.modalFlag = true;
			TweenMax.to('#navContentSp', 0.4, {
				display: "block",
				opacity: 1.0,
				ease: Power2.easeInOut
			});
		} else if(!$(".menu-line").hasClass('is-open')) {
			this.modalFlag = false;
			TweenMax.to('#navContentSp', 0.4, {
				display: "none",
				opacity: 0.0,
				ease: Power2.easeInOut
			});
		}

	}

	onLoad() {

		this.clickEvent();

	}

	setEvents() {

		$(window).on('load', this.onLoad.bind(this));

	}

}