import AnimationHandler from './AnimationHandler';
import * as core from '../core';

class AnimateEls extends AnimationHandler {
  constructor( elements ) {
    super();

    this.elements = elements;
    this.lastPosition = -1;
    this.started = false;

    this.start();
  }

  /**
   *
   * @instance
   * @description adds the active class to animated elements
   * @memberof AnimateEls
   * @method toggleActive
   *
   */
  toggleActive () {
    // toggle active class name
    this.elements.forEach((el) => {
      if (core.util.isElementVisible(el)) {
        el.classList.add('is-active');

      } else {
        el.classList.remove('is-active');
      }
    });
  }

  /**
   *
   * @instance
   * @description Handles calculations for each animation frame
   * @memberof AnimateEls
   * @method loop
   *
   */
  loop () {
    if ( this.started === false ) {
      this.started = true;
      this.toggleActive();
      return false;
    }

    // Avoid calculations if not needed
    if ( this.lastPosition === window.pageYOffset ) {
      return false;
    }

    // Update last position and run calculations
    this.lastPosition = window.pageYOffset;
    this.toggleActive();
  }

  /**
   *
   * @instance
   * @description Initialize the animation frame
   * @memberof AnimateEls
   * @method start
   *
   */
  start () {
    // First add animation class name
    this.elements.forEach((el) => {
      el.classList.add('js-animate');
    });
    // Call on parent cycle
    this.go(this.loop.bind(this));
  }

  /**
   *
   * @instance
   * @description Stop the animation frame
   * @memberof AnimateController
   * @method destroy
   *
   */
  destroy () {
    this.stop();
  }
}

export default AnimateEls;