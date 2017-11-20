/**
 *
 * @public
 * @module controller
 * @description Holds the initializer for controller modules.
 *
 */

import * as core from './core';

// controller modules
import AddScrollingClass from './controllers/AddScrollingClass';
import Intro from './controllers/Intro';
import LoadFonts from './controllers/LoadFonts';
import Navigation from './controllers/Navigation';
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
    // Initialize or register controller modules
    LoadFonts.init();
    AddScrollingClass.init();
    Intro.init();
    Navigation.init();
    core.util.sqscontroller.register('AccountForHeader', AccountForHeader);

    // Emit events
    core.emitter.emit('app--intro-teardown');
  }
};

export default controller;