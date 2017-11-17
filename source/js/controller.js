/**
 *
 * @public
 * @module controller
 * @description Holds the initializer for controller modules.
 *
 */

import * as core from './core';
import AddScrollingClass from './controllers/AddScrollingClass';
import Intro from './controllers/Intro';
import LoadFonts from './controllers/LoadFonts';

// controller modules
function test(element) {
  core.log(element);
}

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
    core.util.sqscontroller.register('test', test);

    // Emit events
    core.emitter.emit('app--intro-teardown');
  }
};

export default controller;