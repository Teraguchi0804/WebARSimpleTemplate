/**
 * fileOverview:
 * Project:
 * File: glStage
 * Date: 19/06/27
 * Author: Teraguchi
 */

import { Howl, Howler } from 'howler';

export default class glStage {
	constructor() {

		// カメラ作成
		this._camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1.0, 5000);
		this._camera.position.y = 0;
		this._camera.position.z = 800;

		// シーン作成
		this._scene = new THREE.Scene();

		// レンダラー作成
		this._renderer = new THREE.WebGLRenderer({
			antialias: true,		// アンチエイリアス有効
			alpha: true					// canvasに透明度バッファを持たせる
		});
		this.render = this._render.bind(this);

		// カメラ設定
		this.context = null;

		// マーカー設定用グループ
		this.marker01 = new THREE.Group(); // マーカをグループとして作成

		this.isAnimePlaying01 = false;

		// arToolkitSourceの作成（マーカトラッキングするメディアソース、カメラ情報）
		this._source = new THREEx.ArToolkitSource({
			sourceType: "webcam",
		});
		this.onResize = this._onResize.bind(this);

		// ArSmoothedControlsを使用してマーカーの検出・非検出するために使用(マーカーの個数分)
		this.smoothedRoot01 = new THREE.Group();
		this.smoothedControls01 = null;

		this.settingArToolkitContext = this._settingArToolkitContext.bind(this);
		this.settingArMarkerControls = this._settingArMarkerControls.bind(this);
		this.settingSmoothedControls = this._settingSmoothedControls.bind(this);

		this.lastTime = Date.now();
		this.mesh = null;

		this.isLoad = false;

		this.lastFrameTime = Date.now() / 1000;
		this.isEnding01 = false;

		this.baseUrl = "assets/resource/data/";
		//
		this.skeletonMesh01 = null;
		//
		this.assetManager = null;
		//

		this.editFileName = this._editFileName.bind(this);

		this.skeletonFile = "spineboy.json";
		this.atlasFile = this.editFileName(this.skeletonFile);
		this.animation = "walk";

		this.cameraTimer = null;
		this.setTimer = this._setTimer.bind(this);
		this.clearTimer = this._clearTimer.bind(this);

		this.isHarryInit = false;
		this.harryTimer = null;
		this.setHarryTimer = this._setHarryTimer.bind(this);
		this.clearHarryTimer = this._clearHarryTimer.bind(this);

		this.cameraInit = this._cameraInit.bind(this);
		this._video = null;
		this.videoTracks = null;
		this.handleSuccess = this._handleSuccess.bind(this);
		this.cameraClose = this._cameraClose.bind(this);

		this.clickEvent = this._clickEvent.bind(this);

		this.geometry = null;
		this.material = null;
		this.loadSpineData = this._loadSpineData.bind(this);
	}

	/**
	 *
	 * @public
	 */
	setup() {

		this._scene.add(this._camera);
		// ==========================================
		this._renderer.setClearColor(new THREE.Color("black"), 0);	// レンダラの背景色
		this._renderer.setSize(640, 480);  													// レンダラのサイズ
		this._renderer.domElement.style.position = "absolute";      // レンダラの位置は絶対値
		this._renderer.domElement.style.top = "0px";      					// レンダラの上端
		this._renderer.domElement.style.left = "0px";     					// レンダラの左端
		this._renderer.setPixelRatio(window.devicePixelRatio);
		// ==========================================

		this.assetManager = new spine.threejs.AssetManager(this.baseUrl);
		this.assetManager.loadText(this.skeletonFile);
		this.assetManager.loadTextureAtlas(this.atlasFile);

		this.loadSpineData();

		// ==========================================

		let light = new THREE.DirectionalLight(0xffffff);     // 平行光源（白）を作成
		light.position.set(0, 0, 2);                          // カメラ方向から照らす
		this._scene.add(light);

		this.settingArToolkitContext();

		this.settingArMarkerControls();

		this.settingSmoothedControls();

		document.getElementById('stage').appendChild(this._renderer.domElement);
		// window.addEventListener('resize', this.onResize);

	}

	/**
	 * ハーリータイマーセット
	 * @private
	 */
	_setHarryTimer() {
		this.harryTimer = null;
		this.harryTimer = setTimeout(() =>{
			// アニメーションのフレームを0に戻す
			this.skeletonMesh01.state.setAnimation(0, this.animation, false);
		},5000);
	}

	/**
	 * ハーリータイマークリア
	 * @private
	 */
	_clearHarryTimer() {
		clearInterval(this.harryTimer);
	}

	/**
	 * カメラタイマーセット
	 * @private
	 */
	_setTimer() {
		// 10秒間以上何もマーカーを認識していない場合はカメラを閉じる
		this.cameraTimer = null;
		this.cameraTimer = setTimeout(() =>{
			if(this.isAnimePlaying01 === false){
				this.cameraClose();
			}
		},10000);
	}

	/**
	 * カメラタイマークリア
	 * @private
	 */
	_clearTimer() {
		if(this.cameraTimer) {
			clearTimeout(this.cameraTimer);
		}
	}

	/**
	 * カメラ初期化
	 * @private
	 */
	_cameraInit() {
		// ソースを初期化し、準備ができたら
		this._source.init(function onReady() {
			// カメラクローズタイマー
			this.setTimer();

			// リサイズ処理
			this.onResize();
		}.bind(this));
	}

	/**
	 * カメラを閉じる
	 * @private
	 */
	_cameraClose() {
		$('body').css('position','static');
		let self = this;
		let StreamObj;
		self._video = $("video");
		self._video.remove();
		TweenMax.to(".main", 0.2, {
			opacity: 1.0,
			display: "block",
			ease: Power2.easeInOut,
			onComplete: () => {
				let handleSuccess = function handleSuccess(stream) {
					$("#video").srcObject = stream;
					self.videoTracks = stream.getVideoTracks();
					StreamObj = stream;
				};
				window.navigator.mediaDevices.getUserMedia({ video: true }).then(handleSuccess);
				setTimeout(function () {
					window.console.log("stop");
					StreamObj.getTracks().forEach(function (track) {
						return track.stop();
					});
				}, 500);
			}
		});
	}

	/**
	 *
	 * @private
	 */
	_handleSuccess(stream) {
		this._video.srcObject = stream;
		this.videoTracks = stream.getVideoTracks();
	}

	/**
	 * タップイベントをアサイン
	 * @private
	 */
	_clickEvent() {

		$(".btnPlay").on('click',function() {
			window.console.log('hoge');
			TweenMax.to(".main", 0.2, {
				opacity: 0.0,
				display: "none",
				ease: Power2.easeInOut,
				onComplete: () => {
					this.cameraInit();
					$('body').css('position','fixed');
				}
			});
		}.bind(this));

	}

	/**
	 * ArToolkitContextの設定
	 * @private
	 */
	_settingArToolkitContext() {
		// arToolkitContext（カメラパラメータ、マーカ検出設定）
		this.context = new THREEx.ArToolkitContext({           											// arToolkitContextの作成
			debug: false, // デバッグ用キャンバス表示（デフォルトfalse）
			cameraParametersUrl: "assets/resource/data/camera_para.dat", // カメラパラメータファイル
			detectionMode: "mono_and_matrix", // 検出モード（color/color_and_matrix/mono/mono_and_matrix）
			imageSmoothingEnabled: true,   // 画像をスムージングするか（デフォルトfalse）
			maxDetectionRate: 120,  // マーカの検出レート（デフォルト60）
		});

		this.context.init(function onCompleted() {                 									// コンテクスト初期化が完了したら
			this._camera.projectionMatrix.copy(this.context.getProjectionMatrix());   // 射影行列をコピー
		}.bind(this));
	}

	/**
	 * ArMarkerControlsの設定
	 * @private
	 */
	_settingArMarkerControls() {
		// ArMarkerControls（マーカと、マーカ検出時の表示オブジェクト）
		let controls01 = new THREEx.ArMarkerControls(this.context, this.marker01, {    // マーカを登録
			type: "pattern",                                    // マーカのタイプ
			patternUrl: "assets/resource/data/hiro.patt",  // マーカファイル
			barcodeValue : null,
			changeMatrixMode : 'modelViewMatrix',
		});
		this._scene.add(this.marker01);                             // マーカをシーンに追加
	}

	/**
	 * マーカーの検出・離れた時のイベント発火
	 * @private
	 */
	_settingSmoothedControls() {

		this.smoothedControls01 = new THREEx.ArSmoothedControls(this.smoothedRoot01, {
			lerpPosition: 0.4,
			lerpQuaternion: 0.3,
			lerpScale: 1,
		});
		this.smoothedControls01.addEventListener('becameVisible', () => {
			console.log('マーカー01認識！！');
			this.isAnimePlaying01 = true;

			if(this.isEnding01){
				this.skeletonMesh01.state.setAnimation(0, this.animation, false);
				this.isEnding01 = false;
			} else {
				this.clearHarryTimer();
			}
			this.clearTimer();
			this.isEnding03 = false;
		});
		this.smoothedControls01.addEventListener('becameUnVisible', () => {
			console.log('マーカー01から外れました！！');
			this.isAnimePlaying01 = false;
			this.setTimer();
			this.setHarryTimer();
		});
	}

	/**
	 * Spineのデータファイル名の編集
	 * @private
	 */
	_editFileName(jsonFileName) {
		let fileName = jsonFileName;
		return fileName.replace("-pro", "").replace("-ess", "").replace(".json", ".atlas");
	}

	/**
	 * Spine データのロード・テクスチャ等をアサインfn
	 * @private
	 */
	_loadSpineData() {
		let self = this;
		if (this.assetManager.isLoadingComplete()) {
			/*---01---*/
			this.isLoad = this.assetManager.isLoadingComplete();
			let atlas = this.assetManager.get(this.atlasFile);
			let atlasLoader = new spine.AtlasAttachmentLoader(atlas);
			let skeletonJson = new spine.SkeletonJson(atlasLoader);
			skeletonJson.scale = 1.0;

			let skeletonData = skeletonJson.readSkeletonData(this.assetManager.get(this.skeletonFile));
			this.skeletonMesh01 = new spine.threejs.SkeletonMesh(skeletonData);
			this.skeletonMesh01.state.addListener({
				start: function(track) {},
				interrupt: function(track) {},
				end: function(track) {},
				disposed: function(track) {},
				complete: function(track) {
					// self.cameraClose();
					self.isEnding01 = true;
				},
				event: function(track, event) {}
			});

			let geometry1 = new THREE.PlaneBufferGeometry(1, 1, 4,4);
			let material1 = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true, opacity: 0.0, transparent: true });
			let mesh1 = new THREE.Mesh( geometry1, material1 );
			mesh1.rotation.x = -Math.PI/2;
			mesh1.position.y = 0;
			mesh1.add(this.skeletonMesh01);
			this.marker01.add(mesh1);
			this.skeletonMesh01.state.setAnimation(0, this.animation, true);
			/*------*/

			window.emiter.emit(EVENT.LOAD_COMP);
		}
		else requestAnimationFrame(this.loadSpineData);
	}

	/**
	 * アニメーションフレームを回す
	 * @public
	 */
	_render() {
		requestAnimationFrame( () => {
			this.render();
		});

		let now = Date.now() / 1000;
		let delta = now - this.lastFrameTime;
		this.lastFrameTime = now;

		if(this.isLoad && this.isAnimePlaying01) {
			this.skeletonMesh01.update(delta);
		}

		// メディアソースの準備ができていなければ抜ける
		if(this._source.ready === false) { return; }

		this.context.update(this._source.domElement);
		this._renderer.render(this._scene, this._camera);

		this.smoothedControls01.update(this.marker01);

	}


	/**
	 * リサイズイベント
	 * @public
	 */
	_onResize() {

		this._camera.aspect = 640 / 480;
		this._camera.updateProjectionMatrix();

		// トラッキングソースをリサイズ
		this._source.onResizeElement();
		// レンダラも同じサイズに
		this._source.copyElementSizeTo(this._renderer.domElement);

		// arControllerがnullでなければ
		if(this.context.arController !== null) {
			// それも同じサイズに
			this._source.copyElementSizeTo(this.context.arController.canvas);
		}
	}

	/**
	 * リサイズイベント
	 * @public
	 */
	initArMarkerControls() {

	}
}
