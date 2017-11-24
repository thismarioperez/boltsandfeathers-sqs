import * as core from '../core';

const html = core.dom.html,
  body = core.dom.body,
  noScroll = 'is-no-scroll';
let scrollPos;

/**
 *
 * @public
 * @namespace AddNoScrollClass
 * @description Adds a no scroll class to prevent body scrolling
 *              while an overlay is open.
 * @memberof controller
 *
 */
const AddNoScrollClass = {
  addNoScroll() {
    // stash scroll position for later
    scrollPos = html.scrollTop;
    // add no scroll state
    html.classList.add(noScroll);
    body.style.top = core.util.px(-1 * scrollPos);
  },

  removeNoScroll() {
    // remove top value
    body.style.top = '';
    // remove no scroll state
    html.classList.remove(noScroll);
    // reset scroll position
    window.scrollTo(0, scrollPos);
  },

  bindListeners() {
    core.emitter.on('app--navigation-open', this.addNoScroll.bind(this));
    core.emitter.on('app--navigation-close', this.removeNoScroll.bind(this));
  },

  init() {
    this.bindListeners();
  }
};

export default AddNoScrollClass;