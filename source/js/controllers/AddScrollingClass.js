import * as core from '../core';
import debounce from 'lodash/debounce';

const body = core.dom.body;
let isBeingScrolled = false;

/**
 *
 * @public
 * @namespace AddScrollingClass
 * @description Adds a scrolling class to disable hover states and other ui
 *              states to improve performance.
 * @memberof controller
 *
 */
const AddScrollingClass = {

  handleScroll() {
    if (isBeingScrolled === true) {
      return;
    }

    isBeingScrolled = true;
    body.classList.add('is-scrolling');
  },

  isStillScrolling() {
    body.classList.remove('is-scrolling');
    isBeingScrolled = false;
  },

  bindListeners() {
    const debouncedScrollDetector = debounce(this.isStillScrolling, 200);
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('scroll', debouncedScrollDetector);
  },

  init() {
    this.bindListeners();
  }
};

export default AddScrollingClass;