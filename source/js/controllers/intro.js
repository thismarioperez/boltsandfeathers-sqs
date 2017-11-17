import * as core from '../core/';

/**
 *
 * @public
 * @namespace intro
 * @description Performs the branded load-in screen sequence.
 * @memberof controller
 *
 */
const intro = {
  /**
   *
   * @public
   * @method init
   * @memberof controller.intro
   * @description Method initializes intro node in DOM.
   *
   */
  init() {
    core.emitter.on('app--intro-teardown', this.teardown.bind(this));
  },

  /**
   *
   * @private
   * @method teardown
   * @memberof intro.teardown
   * @description removes active class from intro on a delay.
   */
  teardown() {
    // remove active class
    setTimeout( () => {
      core.dom.intro.classList.remove( 'is-active' );
    }, 1000 );
    // remove from dom
    setTimeout( () => {
      core.dom.intro.remove();
    }, 2000 );
  }
};

export default intro;
