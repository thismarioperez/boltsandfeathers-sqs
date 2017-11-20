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
  let resizeTimeout;
  const target = element.getAttribute('data-controller-accountForHeader-target') || DEFAULT_TARGET;

  /**
   * @description sets the element's target property to the height value of the header
   */
  const syncWithHeader = () => {
    element.style[target] = core.dom.header.offsetHeight + 'px';
  };

  const handleResize = (e) => {
    if (resizeTimeout) {
      window.cancelAnimationFrame(resizeTimeout);
    }
    resizeTimeout = window.requestAnimationFrame(syncWithHeader);
  };

  const bindListeners = () => {
    window.addEventListener('resize', handleResize);
  };

  const unbindListeners = () => {
    window.removeEventListener('resize', handleResize);
  };

  /**
   * @description sync once then wait for resize to re-sync
   */
  const init = () => {
    syncWithHeader();
    bindListeners();
  };

  const sync = () => {
    syncWithHeader();
  };

  const destroy = () => {
    unbindListeners();
  };

  init();

  return {
    sync,
    destroy,
  };
}

export default AccountForHeader;