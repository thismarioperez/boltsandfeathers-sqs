/**
 *
 * @public
 * @module controller
 * @description Holds the initializer for controller modules.
 *
 */

import * as core from './core';
import intro from './controllers/intro';

const controller = {
  /**
   *
   * @public
   * @method init
   * @memberof controller
   * @description initializes controller modules.
   */
  init() {
    intro.init();
    // emit intro teardown
    core.emitter.emit('app--intro-teardown');
  }
};

export default controller;