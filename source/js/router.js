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
import BannerCallout from './controllers/BannerCallout';
import AnimateController from './controllers/AnimateController';
import BlogLayout from './controllers/BlogLayout';
import BackgroundVideo from './controllers/BackgroundVideo';
import TypeAnim from './controllers/TypeAnim';
import ToggleContent from './controllers/ToggleContent';
import pageLoader from './pageLoader';

const router = {
  /**
   *
   * @private
   * @method execControllers
   * @memberof router
   * @description initializes controller objects.
   */
  initControllers() {
    LoadFonts.init();
    AddScrollingClass.init();
    AddNoScrollClass.init();
    Intro.init();
    Navigation.init();
    NavSocialIcons.init();
  },

  /**
   *
   * @private
   * @method registerControllers
   * @memberof router
   * @description registers controller functions with @squarespace/controller.
   */
  registerControllers() {
    controller.register('AccountForHeader', AccountForHeader);
    controller.register('ImageController', ImageController);
    controller.register('BannerCallout', BannerCallout);
    controller.register('AnimateController', AnimateController);
    controller.register('BlogLayout', BlogLayout);
    controller.register('BackgroundVideo', BackgroundVideo);
    controller.register('ToggleContent', ToggleContent);
    controller.register('TypeAnim', TypeAnim);
  },

  /**
   *
   * @public
   * @method topout
   * @memberof router
   * @description Method set scroll position to zero.
   *
   */
  topout() {
    window.scrollTo(0, 0);
  },

  /**
   *
   * @public
   * @method pageController
   * @memberof router
   * @description handles emmiter page events
   *
   */
  pageController() {
    // when page is ready.
    core.emitter.on('app--page-ready', () => {
      // make sure we start at the top of the next page
      this.topout();
      // get the delay value from core.config
      let delay = core.dom.html.classList.contains('is-first-page-load') ?
        (core.config.pageTransition + core.config.baseTransition) : core.config.pageTransition;
      // add page state classes on a delay
      setTimeout(() => {
        core.dom.html.classList.add('is-page-ready');
        core.dom.html.classList.remove('is-page-loading');
      }, delay);
    });

    // when page is loading
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
    this.registerControllers();
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