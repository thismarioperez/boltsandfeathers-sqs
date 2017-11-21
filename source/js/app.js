// stylesheet
require( '../less/app.less' );

// polyfills
import './polyfill';

import * as core from './core';
import router from './router';

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
    this.router = router;
    this.initModules();
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
    this.core.log('App:env:' + this.core.env.ENV);

    // core
    this.core.detect.init();

    // utility

    // router
    this.router.init();

    // misc/test
    let images = document.querySelectorAll('img[data-src]');
    this.core.util.loadImages(images);
    window.addEventListener('resize', function() {
      core.util.loadImages(document.querySelectorAll('img[src]'));
    });

    // Log when finished
    this.core.log('App: modules initialized');
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
