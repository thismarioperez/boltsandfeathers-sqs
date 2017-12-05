import log from '../core/log';

// Private animation functions
const raf = window.requestAnimationFrame,
  caf = window.cancelAnimationFrame;

/**
 *
 * @public
 * @class AnimationHandler
 * @param {el} element The element that has images to handle.
 * @classdesc Convenience handler for requestAnimationFrame
 *
 */
class AnimationHandler {
  constructor() {
    this._started = false;
    this._paused = false;
    this._cycle = null;

    this.init();
  }

  /**
   *
   *
   * @method go
   * @param {function} fn
   * @returns {this} the AnimationHandler object
   * @memberof AnimationHandler
   * @description go method to kick off animation frames
   */
  go( fn ) {
    if (this._started && this._cycle) {
      return this;
    }

    const self = this,
      anim = () => {
        self._cycle = raf( anim );

        if (self._started) {
          if (typeof fn === 'function') {
            fn();
          }
        }
      };

    anim();
  }

  /**
   *
   *
   * @method pause
   * @returns {this} the AnimationHandler object
   * @memberof AnimationHandler
   * @description Pauses the animation frame cycle
   */
  pause() {
    this._paused = true;
    log('AnimationHandler paused');
    return this;
  }


  /**
   *
   *
   * @method play
   * @returns {this} the AnimationHandler object
   * @memberof AnimationHandler
   * @description Plays the animation frame cycle
   */
  play() {
    this._paused = false;
    log('AnimationHandler played');
    return this;
  }

  /**
   *
   *
   * @method stop
   * @returns {this} the AnimationHandler object
   * @memberof AnimationHandler
   * @description Stops the animation frame cycle and resets values.
   */
  stop() {
    caf( this._cycle );

    this._paused = false;
    this._started = false;
    this._cycle = null;

    log('AnimationHandler stopped');
    return this;
  }

  /**
   *
   *
   * @method init
   * @memberof AnimationHandler
   * @description Starts animation handler
   */
  init() {
    this._started = true;
    log('AnimationHandler started');
  }
}

export default AnimationHandler;