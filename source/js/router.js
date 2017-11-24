/**
 *
 * @public
 * @module router
 * @description Holds the initializer for controller modules.
 *
 */

import * as core from './core';
import controller from '@squarespace/controller';

// controller modules
import AddScrollingClass from './controllers/AddScrollingClass';
import AddNoScrollClass from './controllers/AddNoScrollClass';
import Intro from './controllers/Intro';
import LoadFonts from './controllers/LoadFonts';
import Navigation from './controllers/Navigation';
import NavSocialIcons from './controllers/NavSocialIcons';
import AccountForHeader from './controllers/AccountForHeader';
import ImageController from './controllers/ImageController';
import Banner from './controllers/Banner';

const router = {
  /**
   *
   * @private
   * @method execControllers
   * @memberof router
   * @description initializes controller or register controller modules.
   */
  initControllers() {
    LoadFonts.init();
    AddScrollingClass.init();
    AddNoScrollClass.init();
    Intro.init();
    Navigation.init();
    NavSocialIcons.init();
    controller.register('AccountForHeader', AccountForHeader);
    controller.register('ImageController', ImageController);
    controller.register('Banner', Banner);
  },

  /**
   *
   * @private
   * @method initPage
   * @memberof router
   * @description initializes the app page.
   */
  initPage() {
    this.initControllers();

    // Emit events on document load
    document.addEventListener('DOMContentLoaded', () => {
      core.emitter.emit('app--intro-teardown');
      core.emitter.emit('app--page-ready');
    });

    // handle ajax page load events
    window.addEventListener('mercury:unload', () => {
      core.emitter.emit('app--navigation-close');
      core.emitter.emit('app--page-loading');
    });

    window.addEventListener('mercury:load', () => {
      core.emitter.emit('app--page-ready');
    });
  },

  /**
   *
   * @public
   * @method init
   * @memberof router
   * @description initializes controller modules.
   */
  init() {
    this.initPage();
  }
};

export default router;