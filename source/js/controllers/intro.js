import * as core from '../core/';

/**
 *
 * @public
 * @namespace Intro
 * @description Performs the branded load-in screen sequences.
 * @memberof controller
 *
 */
const Intro = {
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
    window.addEventListener('mercury:load', this.teardown.bind(this));
    window.addEventListener('mercury:unload', this.load.bind(this));
  },

  /**
   *
   * @private
   * @method teardown
   * @memberof intro.teardown
   * @description removes active class from intro on a delay.
   * @todo use promises instead of timeouts
   */
  teardown() {
    // remove active class
    setTimeout( () => {
      core.dom.intro.classList.remove( 'is-active' );
    }, 1000 );
    // remove first instance class
    setTimeout(() => {
      core.dom.html.classList.remove('is-first-page-load');
    }, 1500);
  },

  /**
   *
   * @private
   * @method load
   * @memberof intro.load
   * @description adds active and load classes to intro.
   */
  load() {
    core.dom.intro.classList.add( 'is-active' );
    core.dom.intro.classList.add( 'load' );
  }
};

export default Intro;
