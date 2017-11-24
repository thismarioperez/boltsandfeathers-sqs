import ImageHandler from '../class/ImageHandler';
import * as core from '../core';

/**
 *
 *
 * @method Banner
 * @memberof router
 * @description Handles setup and teardown of Banner sections
 * @param {element} element
 * @returns {object} sync, destroy
 */
function Banner(element) {
  // handler variables
  let resizeHandler = null,
    handleBannerImage = null;

  // the callout element
  const callout = element.querySelector('.js-banner--callout');

  /**
   * @description sets a negative margin of the callout element to half it's height
   * @method setCalloutMargin
   * @memberof Banner
   */
  const setCalloutMargin = () => {
    let margin = core.util.px( callout.offsetHeight / 2 * -1);
    callout.style.marginTop = margin;
  };

  /**
   * @description binds event listeners
   * @method bindListeners
   * @memberof Banner
   */
  const bindListeners = () => {
    window.addEventListener('resize', resizeHandler.go(setCalloutMargin));
  };

  /**
   * @description unbinds event listeners
   * @method unbindListeners
   * @memberof Banner
   */
  const unbindListeners = () => {
    window.addEventListener('resize', resizeHandler.stop(setCalloutMargin));
  };

  /**
   * @description initializes banner scripts
   * @method init
   * @memberof Banner
   */
  const init = () => {
    core.log(callout);
    handleBannerImage = new ImageHandler(element);
    resizeHandler = new core.anim();
    setCalloutMargin();
    bindListeners();
  };

  /**
   * @description syncs banner scripts
   * @method init
   * @memberof Banner
   */
  const sync = () => {
    handleBannerImage.sync();
    resizeHandler.pause();
    setCalloutMargin();
    resizeHandler.play();
  };

  /**
   * @description destroys and tearsdown banner scripts
   * @method init
   * @memberof Banner
   */
  const destroy = () => {
    unbindListeners();
    handleBannerImage.destroy();
    handleBannerImage = null;
    resizeHandler = null;
  };

  // kick it off
  init();

  return {
    sync,
    destroy
  };
}

export default Banner;