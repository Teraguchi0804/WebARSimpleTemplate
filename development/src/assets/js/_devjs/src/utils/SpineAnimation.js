/**
 * fileOverview:
 * Project:
 * File: SpineAnimation
 * Date: 19/02/04
 * Author: Teraguchi
 */


'use strict';
// import * as THREE from 'three';

export default class SpineAnimation extends THREE.Object3D　{

	/*** @returns {string} */
	static get SKELETON_DATA_LOADED() {
		return 'skeletonDataLoaded';
	}

	constructor(name, path, scale) {

		super();

		// THREE.Object3D.call(this);

		this.name = name;

		this.path = path ? (path +
			((path.substr(-1) != '/') ? '/' : '')
		) : '';

		// this.scale = scale;
		// this.scale = 0.4;

		window.console.log(this.path);


		this.matrix = new THREE.Matrix4();

		this.update = this._update.bind(this);

		this.dispose = this._dispose.bind(this);

		this.loadText = this._loadText.bind(this);
		this.loadImage = this._loadImage.bind(this);

		this.setup();
	}

	setup() {

		let self = this;

		this.loadText(this.path + this.name + '.atlas', function (atlasText) {
			self.atlas = new spine.Atlas(atlasText, {
				load: function (page, image, atlas) {
					self.loadImage(self.path + image, function (image) {
						// calculate UVs in atlas regions
						page.width = image.width;
						page.height = image.height;

						atlas.updateUVs(page);

						// propagate new UVs to attachments, if they were already created
						if (self.skeleton) {
							let skins = self.skeleton.data.skins;
							for (let s = 0, n = skins.length; s < n; s++) {
								let attachments = skins[s].attachments;
								for (let k in attachments) {
									let attachment = attachments[k];
									if (attachment instanceof spine.RegionAttachment) {
										let region = attachment.rendererObject;
										attachment.setUVs(region.u, region.v, region.u2, region.v2, region.rotate);
									}
								}
							}
						}

						// create basic material for the page
						let texture = new THREE.Texture(image);
						texture.needsUpdate = true;

						page.rendererObject = [
							new THREE.MeshBasicMaterial({
								//color: 0xff00, wireframe: true,
								map : texture, side : THREE.DoubleSide, transparent : true, alphaTest : 0.5
							})
						];
					});
				},
				unload: function (materials) {
					for (let i = 0, n = materials.length; i < n; i++) {
						let material = materials[i];
						if (material.meshes) {
							for (let name in material.meshes) {
								let mesh = material.meshes[name];
								if (mesh.parent) mesh.parent.remove(mesh);
								mesh.geometry.dispose();
							}
						}
						material.map.dispose();
						material.dispose();
					}
					// will be called multiple times
					materials.length = 0;
				}
			});

			self.loadText(self.path + self.name + '.json', function (skeletonText) {
				let json = new spine.SkeletonJson(new spine.AtlasAttachmentLoader(self.atlas));
				// json.scale = self.scale || 1;
				// json.scale = scale || 1;
				json.scale = 0.4 || 1;

				let skeletonData = json.readSkeletonData(JSON.parse(skeletonText));

				self.skeleton = new spine.Skeleton(skeletonData);
				self.stateData = new spine.AnimationStateData(skeletonData);
				self.state = new spine.AnimationState(self.stateData);


				self.dispatchEvent({
					type : SpineAnimation.SKELETON_DATA_LOADED
				});
			});
		});



	}

	/**
	 *
	 * @param url
	 * @param callback
	 * @returns {XMLHttpRequest}
	 * @private
	 */
	_loadText(url, callback) {
		let req = new XMLHttpRequest();
		req.open("GET", url, true);
		req.responseType = 'text';
		req.addEventListener('error', function (event) {}, false);
		req.addEventListener('abort', function (event) {}, false);
		req.addEventListener('load', function (event) { callback(req.response); }, false);
		req.send();
		return req;
	}

	/**
	 *
	 * @param url
	 * @param callback
	 * @returns {HTMLImageElement}
	 * @private
	 */
	_loadImage(url, callback) {
		let image = new Image();
		image.addEventListener('error', function (event) {}, false);
		image.addEventListener('abort', function (event) {}, false);
		image.addEventListener('load', function (event) { callback (image); }, false);
		image.src = url;
		return image;
	}

	/**
	 *
	 * @param dt
	 * @param dz
	 * @private
	 */
	_update(dt, dz) {
		if (!this.state) return;

		this.state.update(dt || (1.0 / 60));
		this.state.apply(this.skeleton);
		this.skeleton.updateWorldTransform();

		this.traverse(function (object) {
			if (object instanceof THREE.Mesh) {
				object.visible = false;
			}
		});

		let Z = 0;
		var drawOrder = this.skeleton.drawOrder;
		for (let i = 0, n = drawOrder.length; i < n; i++) {
			let slot = drawOrder[i];
			let attachment = slot.attachment;
			if (!(attachment instanceof spine.RegionAttachment)) continue;

			let materials = attachment.rendererObject.page.rendererObject;
			// texture was not loaded yet
			if (!materials) continue;

			if (slot.data.additiveBlending && (materials.length == 1)) {
				// create separate material for additive blending
				materials.push(new THREE.MeshBasicMaterial({
					map : materials[0].map,
					side : THREE.DoubleSide,
					transparent : true,
					blending : THREE.AdditiveBlending,
					depthWrite : false
				}));
			}

			let material = materials[ slot.data.additiveBlending ? 1 : 0 ];

			material.meshes = material.meshes || {};

			let mesh = material.meshes[slot.data.name];

			let geometry;

			if (mesh) {
				geometry = mesh.geometry;

				mesh.visible = true;
			} else {
				geometry = new THREE.PlaneGeometry(
					attachment.regionOriginalWidth,
					attachment.regionOriginalHeight
				);
				geometry.dynamic = true;

				mesh = new THREE.Mesh(geometry, material);
				mesh.matrixAutoUpdate = false;

				material.meshes[slot.data.name] = mesh;
				this.add(mesh);
			}

			if (mesh.attachmentTime && (slot.getAttachmentTime () > mesh.attachmentTime)) {
				// do nothing
			} else {
				// update UVs
				geometry.faceVertexUvs[0][0][0].set(attachment.uvs[6], 1- attachment.uvs[7]);
				geometry.faceVertexUvs[0][0][1].set(attachment.uvs[4], 1- attachment.uvs[5]);
				geometry.faceVertexUvs[0][0][2].set(attachment.uvs[0], 1- attachment.uvs[1]);
				geometry.faceVertexUvs[0][1][0].set(attachment.uvs[4], 1- attachment.uvs[5]);
				geometry.faceVertexUvs[0][1][1].set(attachment.uvs[2], 1- attachment.uvs[3]);
				geometry.faceVertexUvs[0][1][2].set(attachment.uvs[0], 1- attachment.uvs[1]);
				geometry.uvsNeedUpdate = true;

				geometry.vertices[1].set(attachment.offset[0], attachment.offset[1], 0);
				geometry.vertices[3].set(attachment.offset[2], attachment.offset[3], 0);
				geometry.vertices[2].set(attachment.offset[4], attachment.offset[5], 0);
				geometry.vertices[0].set(attachment.offset[6], attachment.offset[7], 0);
				geometry.verticesNeedUpdate = true;

				mesh.attachmentTime = slot.getAttachmentTime();
			}

			this.matrix.makeTranslation(
				this.skeleton.x + slot.bone.worldX,
				this.skeleton.y + slot.bone.worldY,
				(dz || 0.1) * Z++
			);

			this.matrix.elements[0] = slot.bone.a; this.matrix.elements[4] = slot.bone.b;
			this.matrix.elements[1] = slot.bone.c; this.matrix.elements[5] = slot.bone.d;

			mesh.matrix.copy(this.matrix);

			/* TODO slot.r,g,b,a ?? turbulenz example code:
			batch.add(
				attachment.rendererObject.page.rendererObject,
				vertices[0], vertices[1],
				vertices[6], vertices[7],
				vertices[2], vertices[3],
				vertices[4], vertices[5],
				skeleton.r * slot.r,
				skeleton.g * slot.g,
				skeleton.b * slot.b,
				skeleton.a * slot.a,
				attachment.uvs[0], attachment.uvs[1],
				attachment.uvs[4], attachment.uvs[5]
			);
			*/
		}
	}

	/**
	 *
	 * @private
	 */
	_dispose() {
		let self = this;
		if (self.parent) self.parent.remove(this); this.atlas.dispose();
	}

}
