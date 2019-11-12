/**
 * fileOverview:
 * Project:
 * File: YouTubeUtil
 * Date: 17/10/24
 * Author: Teraguchi
 */


'use strict';

export default class YouTubeUtil {

  constructor(){
		if ( !$('#YTScript').length ){
			let tag = document.createElement('script');
			tag.id ='YTScript';
			tag.src = "https://www.youtube.com/iframe_api";
			let firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		}

  }

	create(data, options, callback){
		let defaultOptions = {
			autoplay: 0,
			controls: 0,
			showinfo: 0,
			modestbranding: true,
			rel: 0,
			iv_load_policy: 3,
			wmode : 'transparent',
		};
		let vars = $.extend(defaultOptions, options);


		this.onReady(()=>{
			let player = new YT.Player(data.id, {
				videoId: data.videoId,
				width: data.width ? data.width : null,
				height: data.height ? data.height : null,
				playerVars: vars,
				events: {
					onReady: (e)=>{
						this.player = e.target;
						this.$movie = $(`#${data.id}`);
						callback();
					},
					onStateChange: (e)=>{
						if ( e.data == YT.PlayerState.ENDED ) {
							this.onEnded();
						}
						if ( e.data == YT.PlayerState.PLAYING ) {
							this.onPlaying();
						}
						if( e.data == YT.PlayerState.PAUSED ){
							this.onPaused();
						}
					}
				}
			});
		});
	}

	onReady(callback){
		let EVENT_READY = "youtubeready";
		if(window.YT && window.YT.Player){
			return callback();
		}
		$(window).on(EVENT_READY, callback);
		window.onYouTubeIframeAPIReady = function(){
			$(function(){
				$(this).trigger(EVENT_READY);
				window.onYouTubeIframeAPIReady = void 0;
			});
		};
	}

	play(){
		if ( this.player ){
			this.player.playVideo();
		}
	}

	pause(){
		if ( this.player ){
			this.player.pauseVideo();
		}
	}

	replay(){
		if ( this.player ){
			this.player.seekTo(0);
			this.player.playVideo();
		}
	}

	mute(){
		if ( this.player ){
			this.player.mute();
		}
	}

	unMute(){
		if ( this.player ){
			this.player.unMute();
		}
	}

	onEnded(){
		if ( this.player ){
			this.player.playVideo();
		}
	}


	seek(seekTime){
		this.player.seekTo(seekTime);
	}


	onPlaying(){

	}

	onPaused(){

	}

	getCurrentTime(){
		return this.player.getCurrentTime();
	}

}