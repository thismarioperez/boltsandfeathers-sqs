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
import pageLoader from './pageLoader';

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

  pageController() {
    core.emitter.on('app--page-ready', () => {
      let delay = core.dom.html.classList.contains('is-first-page-load') ? (core.config.pageTransition + core.config.baseTransition) : core.config.pageTransition;
      setTimeout(() => {
        core.dom.html.classList.add('is-page-ready');
        core.dom.html.classList.remove('is-page-loading');
      }, delay);
    });
    core.emitter.on('app--page-loading', () => {
      core.dom.html.classList.add('is-page-loading');
      core.dom.html.classList.remove('is-page-ready');
    });
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
    this.pageController();
    pageLoader();

    // Emit events on document load
    document.addEventListener('DOMContentLoaded', () => {
      core.emitter.emit('app--page-ready');
      core.emitter.emit('app--intro-teardown');
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