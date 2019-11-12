/**
 * fileOverview:
 * Project:
 * File: Common
 * Date:
 * Author: Teraguchi
 */

'use strict';

import { TweenMax } from 'gsap';
export default class Common {

  constructor() {

    this.setup();
    this.setEvents();

  }

	setup() {

  }

  onReady() {


  }

  onLoad() {

  }

  setEvents() {

    $(document).on('ready', this.onReady.bind(this));
		$(window).on('load', this.onLoad.bind(this));

  }

}
