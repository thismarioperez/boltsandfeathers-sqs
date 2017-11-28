import * as core from '../core';
import debounce from 'lodash/debounce';

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
  const target = element.getAttribute('data-controller-accountForHeader-target') || DEFAULT_TARGET;

  /**
   * @description sets the element's target property to the height value of the header
   */
  const syncWithHeader = () => {
    element.style[target] = core.util.px(core.dom.header.offsetHeight);
  };

  const handleResize = debounce(syncWithHeader, 200);

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