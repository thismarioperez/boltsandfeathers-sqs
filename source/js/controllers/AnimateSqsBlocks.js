import * as core from '../core';
import AnimateEls from '../class/AnimateEls';

const SQS_SELECTOR = '.sqs-block:not(.html-block)';

/**
 *
 * @public
 * @namespace AnimateSqsBlocks
 * @description Adds a scrolling class to sqs block elements
 * @memberof controller
 *
 */
function AnimateSqsBlocks(element) {
  // if logged in, disable this
  if (core.env.isAuth()) {
    return false;
  }

  let handleAnimations = null,
    animatedEls = null;

  const getElsToAnimate = () => {
    return Array.from(element.querySelectorAll(SQS_SELECTOR));
  };

  const init = () => {
    animatedEls = getElsToAnimate();
    handleAnimations = new AnimateEls(animatedEls);
  };

  const sync = () => {
    handleAnimations.destroy();
    handleAnimations = null;
    animatedEls = getElsToAnimate();
    handleAnimations = new AnimateEls(animatedEls);
  };

  const destroy = () => {
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

export default AnimateSqsBlocks;