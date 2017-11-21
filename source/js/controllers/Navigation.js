import * as core from '../core';

const menuOpen = 'is-menu-open';
const isActive = 'is-active';

/**
 *
 * @public
 * @namespace Navigation
 * @description Toggles navigation screen and state.
 * @memberof controller
 *
 */
const Navigation = {
  /**
   *
   * @private
   * @description Logic for opening the navigation
   * @method open
   * @memberof Navigation
   */
  open() {
    core.dom.nav.classList.add(isActive);
    core.dom.html.classList.add(menuOpen);

    core.log('Navigation: open');
  },

  /**
   *
   * @private
   * @description Logic for closing the navigation
   * @method close
   * @memberof Navigation
   */
  close() {
    core.dom.nav.classList.remove(isActive);
    core.dom.html.classList.remove(menuOpen);

    core.log('Navigation: closed');
  },

  /**
   *
   * @private
   * @description Emits navigation events on click
   * @method handleClick
   * @memberof Navigation
   */
  handleClick(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!(core.dom.nav.classList.contains(isActive) && core.dom.html.classList.contains(menuOpen))) {
      core.emitter.emit('app--navigation-open');
    } else {
      core.emitter.emit('app--navigation-close');
    }

    core.log('Navigation: menu trigger clicked');
  },

  /**
   *
   * @private
   * @description Binds event handlers with event listeners.
   * @method bindListeners
   * @memberof Navigation
   */
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