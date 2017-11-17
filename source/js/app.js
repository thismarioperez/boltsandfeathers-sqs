require( '../less/screen.less' );

import * as core from './core';
import controller from './controllers';

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
    this.core.log('App: environment is ' + this.core.env.ENV);    
    let images = document.querySelectorAll('img[data-src]');
    this.core.util.loadImages(images);
    this.core.detect.init();
    this.core.util.loadFonts();
    this.controller.init();
    this.core.emitter.emit('app--intro-teardown');
    this.core.log('App: all modules initialized');
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
    this.core.log('App: all top-level events bound');
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
