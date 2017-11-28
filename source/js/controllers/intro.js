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
    core.emitter.on('app--page-ready', this.teardown.bind(this));
    core.emitter.on('app--page-loading', this.load.bind(this));
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
    }, core.config.pageTransition );

    // remove first instance class after page is visible
    if (core.dom.html.classList.contains('is-first-page-load')) {
      setTimeout(() => {
        core.dom.html.classList.remove('is-first-page-load');
      }, core.config.pageTransition + core.config.baseTransition);
    }
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
