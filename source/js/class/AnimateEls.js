import AnimationHandler from './AnimationHandler';
import * as core from '../core';

class AnimateEls extends AnimationHandler {
  constructor( elements ) {
    super();

    this.elements = elements;

    this.start();
  }

  /**
   *
   * @instance
   * @description Initialize the animation frame
   * @memberof AnimateEls
   * @method start
   *
   */
  start() {
    // First add animation class name
    this.elements.forEach((el) => {
      el.classList.add('js-animate');
    });
    // Call on parent cycle
    this.go(() => {
      // toggle active class name
      this.elements.forEach((el) => {
        if (core.util.isElementVisible(el)) {
          el.classList.add('is-active');

        } else {
          el.classList.remove('is-active');
        }
      });
    });
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