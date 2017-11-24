import * as core from '../core';

const DEFAULT_TARGET = 'paddingTop';

/**
 * @public
 * @description Syncs an element's top or padding-top value with the height of the header
 * @method AccountForHeader
 * @memberof Controller
 * @param {any} element
 * @returns {sync, destroy}
 */
function AccountForHeader(element) {
  let resizeHandler;
  const target = element.getAttribute('data-controller-accountForHeader-target') || DEFAULT_TARGET;

  /**
   * @description sets the element's target property to the height value of the header
   */
  const syncWithHeader = () => {
    element.style[target] = core.util.px(core.dom.header.offsetHeight);
  };

  const bindListeners = () => {
    window.addEventListener('resize', resizeHandler.go(syncWithHeader));
  };

  const unbindListeners = () => {
    window.removeEventListener('resize', resizeHandler.stop(syncWithHeader));
  };

  /**
   * @description sync once then wait for resize to re-sync
   */
  const init = () => {
    syncWithHeader();
    resizeHandler = new core.anim();
    bindListeners();
  };

  const sync = () => {
    resizeHandler.pause();
    syncWithHeader();
    resizeHandler.play();
  };

  const destroy = () => {
    unbindListeners();
    resizeHandler = null;
  };

  init();

  return {
    sync,
    destroy,
  };
}

export default AccountForHeader;