// stylesheet
require( '../less/app.less' );

// polyfills
import './polyfill';

import * as core from './core';
import controller from './controller';

/**
 *
 * @public
 * @class App
 * @classdesc Load the App application Class to handle it ALL.
 *
 */
class App {
  constructor() {
    this.core = core;
    this.controller = controller;
    this.initModules();
    this.bindEvents();
  }

  /**
   *
   * @public
   * @instance
   * @method initModules
   * @memberof App
   * @description Initialize modules.
   *
   */
  initModules() {
    // Log environment
    this.core.log('App: environment is ' + this.core.env.ENV);

    // core
    this.core.detect.init();

    // utility
    this.core.util.loadFonts();

    // controller
    this.controller.init();

    // misc/test
    let images = document.querySelectorAll('img[data-src]');
    this.core.util.loadImages(images);

    // Log when finished
    this.core.log('App: modules initialized');
  }

  /**
   *
   * @public
   * @instance
   * @method bindEvents
   * @memberof App
   * @description Bind top-level app events.
   *
   */
  bindEvents() {
    window.addEventListener('resize', function() {
      let images = document.querySelectorAll('img[src]');
      core.util.loadImages(images);
    });
    this.core.log('App: event handlers bound');
  }
}

/******************************************************************************
 * Expose
*******************************************************************************/
window.app = new App();


/******************************************************************************
 * Export
*******************************************************************************/
export default window.app;
