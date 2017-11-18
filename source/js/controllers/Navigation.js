import * as core from '../core';

/**
 *
 * @public
 * @namespace Navigation
 * @description Toggles navigation screen and state.
 * @memberof controller
 *
 */
const Navigation = {
  open() {
    core.dom.nav.classList.add('is-active');
    core.dom.html.classList.add('is-nav-open');

    core.log('Navigation: open');
  },

  close() {
    core.dom.nav.classList.remove('is-active');
    core.dom.html.classList.remove('is-nav-open');

    core.log('Navigation: closed');
  },

  handleClick(e) {
    e.preventDefault();
    e.stopPropagation();

    if (core.dom.nav.classList.contains('is-active') && core.dom.html.classList.contains('is-nav-open')) {
      core.emitter.emit('app--navigation-close');
    } else {
      core.emitter.emit('app--navigation-open');
    }

    core.log('Navigation: menu trigger clicked');
  },

  bindListeners() {
    document.querySelector('.js-menu-trigger').addEventListener('click', this.handleClick.bind(this));
    core.emitter.on('app--navigation-open', this.open.bind(this));
    core.emitter.on('app--navigation-close', this.close.bind(this));
  },

  /**
   *
   * @public
   * @method init
   * @description Kicks off navigation scripts
   * @memberof controller.Navigation
   *
   */
  init() {
    this.bindListeners();
  }
};

export default Navigation;