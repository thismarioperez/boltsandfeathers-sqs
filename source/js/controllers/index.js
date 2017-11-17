/**
 *
 * @public
 * @module controller
 * @description Holds the initializer for controller modules.
 *
 */

import intro from './intro';

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
  }
};

export default controller;