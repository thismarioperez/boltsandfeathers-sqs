/**
 *
 * @public
 * @module router
 * @description Holds the initializer for controller modules.
 *
 */

import * as core from './core';
import sqscontroller from '@squarespace/controller';

// controller modules
import AddScrollingClass from './controllers/AddScrollingClass';
import Intro from './controllers/Intro';
import LoadFonts from './controllers/LoadFonts';
import Navigation from './controllers/Navigation';
import NavSocialIcons from './controllers/NavSocialIcons';
import AccountForHeader from './controllers/AccountForHeader';

const router = {
  /**
   *
   * @private
   * @method execControllers
   * @memberof router
   * @description initializes controller or register sqscontroller modules.
   */
  initControllers() {
    LoadFonts.init();
    AddScrollingClass.init();
    Intro.init();
    Navigation.init();
    NavSocialIcons.init();
    sqscontroller.register('AccountForHeader', AccountForHeader);

    // Emit events
    core.emitter.emit('app--intro-teardown');
    core.emitter.emit('app--page-ready');
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

    // ajax page load events
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