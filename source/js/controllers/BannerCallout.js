import * as core from '../core';
import debounce from 'lodash/debounce';

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
  // the callout element
  const callout = element;

  /**
   * @description sets a negative margin of the callout element to half it's height
   * @method setCalloutMargin
   * @memberof Banner
   */
  const setCalloutMargin = () => {
    let margin = core.util.px( callout.offsetHeight / 2 * -1);
    callout.style.marginTop = margin;
  };

  const handleResize = debounce(setCalloutMargin, 200);

  /**
   * @description binds event listeners
   * @method bindListeners
   * @memberof Banner
   */
  const bindListeners = () => {
    window.addEventListener('resize', handleResize);
  };

  /**
   * @description unbinds event listeners
   * @method unbindListeners
   * @memberof Banner
   */
  const unbindListeners = () => {
    window.removeEventListener('resize', handleResize);
  };

  /**
   * @description initializes banner scripts
   * @method init
   * @memberof Banner
   */
  const init = () => {
    setCalloutMargin();
    bindListeners();
  };

  /**
   * @description syncs banner scripts
   * @method init
   * @memberof Banner
   */
  const sync = () => {
    setCalloutMargin();
  };

  /**
   * @description destroys and tearsdown banner scripts
   * @method init
   * @memberof Banner
   */
  const destroy = () => {
    unbindListeners();
  };

  // kick it off
  init();

  return {
    sync,
    destroy
  };
}

export default Banner;