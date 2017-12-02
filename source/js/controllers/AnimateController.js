import * as core from '../core';
import AnimateEls from '../class/AnimateEls';

const SELECTORS = '.sqs-block, .js-banner--callout, .entry--list';

/**
 *
 * @public
 * @namespace AnimateController
 * @description Adds a scrolling class to sqs block elements
 * @memberof controller
 *
 */
function AnimateController(element) {
  // if logged in, disable this
  if (core.env.isAuth()) {
    return false;
  }

  let handleAnimations = null,
    animatedEls = null;

  const getElsToAnimate = () => {
    return Array.from(element.querySelectorAll(SELECTORS));
  };

  const sync = () => {
    handleAnimations.destroy();
    handleAnimations = null;
    animatedEls = getElsToAnimate();
    handleAnimations = new AnimateEls(animatedEls);
  };

  const bindListeners = () =>{
    // Pause animations when navigation is open
    core.emitter.on('app--navigation-open', handleAnimations.pause);
    core.emitter.on('app--navigation-close', handleAnimations.play);
    core.emitter.on('blog--ajax-load', sync);
  };

  const unbindListeners = () => {
    // remove these listeners on destroy
    core.emitter.removeListener('app--navigation-open', handleAnimations.pause);
    core.emitter.removeListener('app--navigation-close', handleAnimations.play);
  };

  const init = () => {
    animatedEls = getElsToAnimate();
    handleAnimations = new AnimateEls(animatedEls);
    bindListeners();
  };

  const destroy = () => {
    unbindListeners();
    handleAnimations.destroy();
    handleAnimations = null;
    animatedEls = null;
  };

  init();

  return {
    sync,
    destroy
  };
}

export default AnimateController;