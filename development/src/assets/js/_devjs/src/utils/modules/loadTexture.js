/**
 * テクスチャのプリローダー機構
 * @type {Ad|bi}
 */

const textureLoader = new THREE.TextureLoader();

export default function(imgs, callback) {
	const length = Object.keys(imgs).length;
	const loadedTexture = {};
	let count = 0;

	for (let key in imgs) {
		const k = key;
		// プロトタイプの拡張などで追加されたメソッドも出力されない様に
		// hasOwnPropertyで判断
		if (imgs.hasOwnProperty(k)) {
			textureLoader.load(imgs[k], (tex) => {
				tex.repeat = THREE.RepeatWrapping;
				loadedTexture[k] = tex;
				count++;
				if (count >= length) callback(loadedTexture);
			});
		}
	}
}