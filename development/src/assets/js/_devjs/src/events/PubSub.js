/**
 * fileOverview: イベントディスパッチャー代替
 * Project:
 * File:
 * Date:
 * Author:
 */


'use strict';


export default class PubSub {


	/**
	 * @constructor
	 */
	constructor(context) {
		this._events = {};
		this._parentEventTarget = [];
		this._context = context;
	}


	/**
	 *
	 * @param type
	 * @param callback
	 * @param context
	 * @param priority
	 */
	one(type, callback, context, priority) {

		var handler = function () {
			this.off(type, handler);
			callback.apply(this, arguments);
		}.bind(this);

		this.on(type, handler, context, priority);

	}


	/**
	 *
	 * @param type
	 * @param callback
	 * @param context
	 * @param priority
	 */
	addEventListener(type, callback, context, priority) {

		priority = priority || 0;

		this._events[type] = {}.hasOwnProperty.call(this._events, type) ? this._events[type] : {};
		var listenerToInsert = {context: context, callback: callback, priority: priority};

		if (this._events[type].listeners) {
			var listeners = this._events[type].listeners;
			var inserted = false;
			for (var i = 0, length = listeners.length; i < length; i++) {
				var listener = listeners[i];
				var eventPriority = listener.priority;
				if (priority < eventPriority) {
					listeners.splice(i, 0, listenerToInsert);
					inserted = true;
					break;
				}
			}
			if (!inserted) {
				listeners.push(listenerToInsert);
			}
		} else {
			this._events[type].listeners = [listenerToInsert];
		}
	};


	/**
	 *
	 */
	subscribe() {
		this.addEventListener.apply(this, arguments);
	}

	/**
	 *
	 */
	bind() {
		this.addEventListener.apply(this, arguments);
	}

	/**
	 *
	 */
	on() {
		this.addEventListener.apply(this, arguments);
	}


	/**
	 *
	 * @param type
	 * @param callback
	 * @returns {boolean}
	 */
	removeEventListener(type, callback) {
		var listeners = this._events[type] ? this._events[type].listeners : null;

		if (!listeners || listeners.length < 1) {
			return false;
		}

		if (!callback) {
			this._events[type].listeners = [];
			return true;
		}

		for (var i = 0, length = listeners.length; i < length; i++) {
			var listener = listeners[i];
			if (listener.callback === callback) {
				listeners.splice(i, 1);
				return true;
			}
		}

		return false;
	}


	/**
	 *
	 */
	unsubscribe() {
		this.removeEventListener.apply(this, arguments);
	}


	/**
	 *
	 */
	unbind() {
		this.removeEventListener.apply(this, arguments);
	}

	/**
	 *
	 */
	off() {
		this.removeEventListener.apply(this, arguments);
	}


	/**
	 *
	 */
	removeAllEventListener() {
		for (var key in this._events) {
			if (this._events.hasOwnProperty(key)) {
				this._events[key].listeners.length = 0;
				delete this._events[key];
			}
		}

		this._events = [];
	};


	/**
	 *
	 */
	unbindAll() {
		this.removeAllEventListener.apply(this, arguments);
	}


	/**
	 *
	 */
	offAll() {
		this.removeAllEventListener.apply(this, arguments);
	}


	/**
	 *
	 * @param type
	 * @param callback
	 * @returns {boolean}
	 */
	hasEventListener(type, callback) {
		var listeners = this._events[type] ? this._events[type].listeners : null;

		if (!listeners) {
			return false;
		}

		if (!callback) {
			return listeners.length > 0;
		}

		for (var i = 0, length = listeners.length; i < length; i++) {
			var listener = listeners[i];
			if (listener.callback === callback) {
				return true;
			}
		}

		return false;
	}


	/**
	 *
	 */
	hasTopic() {
		this.hasEventListener.apply(this, arguments);
	}


	/**
	 *
	 * @param type
	 * @param option
	 * @param target
	 */
	dispatchEvent(type, option, target) {

		var event = {
			type: type,
			params: option
		};

		if (target) {
			event.target = target;
		}

		var listeners = this._events[type] ? this._events[type].listeners : null;

		if (!listeners || listeners.length < 1) {
			return;
		}

		for (var i = listeners.length - 1; i >= 0; i--) {
			var listener = listeners[i];
			var callback = listener.callback;
			var callbackContext = listener.context ? listener.context : this._context;

			if (!('target' in event)) {
				event.target = this;
			}

			event.currentTarget = this;
			event.context = callbackContext;
			var result = null;

			if (!callback) {
				return;
			}

			if (typeof callback === 'function') {
				result = callback.call(this, event);
			} else if (callback.hasOwnProperty('handleEvent') && typeof callback.handleEvent === 'function') {
				result = callback.handleEvent.call(this, event);
			}

			if (result !== undefined && !result) {
				break;
			}
		}
	};


	/**
	 *
	 */
	publish() {
		this.dispatchEvent.apply(this, arguments);
	};


	/**
	 *
	 */
	trigger() {
		this.dispatchEvent.apply(this, arguments);
	}


	/**
	 *
	 */
	fire() {
		this.dispatchEvent.apply(this, arguments);
	}


	/**
	 *
	 */
	dispatch() {
		this.dispatchEvent.apply(this, arguments);
	}

};
