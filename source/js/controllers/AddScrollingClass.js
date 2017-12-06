import * as core from '../core';
import debounce from 'lodash/debounce';

const html = core.dom.html;
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
  lastScrollTop: 0,

  handleScroll() {
    if (isBeingScrolled === true) {
      return;
    }

    isBeingScrolled = true;
    html.classList.add('is-scrolling');
  },

  isStillScrolling() {
    html.classList.remove('is-scrolling');
    let scrollTop = Math.max(window.pageYOffset, html.scrollTop, body.scrollTop);
    if (scrollTop <= 0) {
      html.classList.remove('is-scrolled-up');
      html.classList.remove('is-scrolled-down');
    } else if (scrollTop > this.lastScrollTop) {
      html.classList.remove('is-scrolled-up');
      html.classList.add('is-scrolled-down');
    } else {
      html.classList.remove('is-scrolled-down');
      html.classList.add('is-scrolled-up');
    }
    this.lastScrollTop = scrollTop;
    isBeingScrolled = false;
  },

  bindListeners() {
    const debouncedScrollDetector = debounce(this.isStillScrolling.bind(this), 200);
    window.addEventListener('scroll', this.handleScroll.bind(this));
    window.addEventListener('scroll', debouncedScrollDetector.bind(this));
  },

  init() {
    this.bindListeners();
  }
};

export default AddScrollingClass;