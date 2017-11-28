import AnimationHandler from './AnimationHandler';
import * as core from '../core';

class AnimateEls extends AnimationHandler {
  constructor( elements ) {
    super();

    this.elements = elements;

    this.init();
  }

  init() {
    this.elements.forEach((el, i) => {
      this.elements[i].classList.add('js-animate');
    });

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
    // Call on parent cycle
    this.go(() => {
      this.elements.forEach((el, i) => {
        if (core.util.isElementVisible(el)) {
          this.elements[i].classList.add('is-active');

        } else {
          this.elements[i].classList.remove('is-active');
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