/**
 *
 * @public
 * @module controller
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

const controller = {
  /**
   *
   * @public
   * @method init
   * @memberof controller
   * @description initializes controller modules.
   */
  init() {
    // Initialize controller or register sqscontroller modules
    LoadFonts.init();
    AddScrollingClass.init();
    Intro.init();
    Navigation.init();
    NavSocialIcons.init();
    sqscontroller.register('AccountForHeader', AccountForHeader);

    // Emit events
    core.emitter.emit('app--intro-teardown');
  }
};

export default controller;