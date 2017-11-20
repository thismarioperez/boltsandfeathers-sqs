import * as core from '../core';

const menuOpen = 'is-menu-open';
const isActive = 'is-active';
const navSocialIconsStyle = 'tweak-social-icons-style-regular';
let currentIconStyle;
let needsIconStyleReset;

/**
 *
 * @public
 * @namespace Navigation
 * @description Toggles navigation screen and state.
 * @memberof controller
 * @todo Add mutationObserver to run getIconStyle() when style editor changes are made.
 *
 */
const Navigation = {
  /**
   *
   * @private
   * @description Determines whether icon styles need to be reset when navigation is opened.
   * @method getIconStyle
   * @memberof Navigation
   */
  getIconStyle() {
    const bodyClassnames = Array.from(core.dom.body.classList);
    let iconClassname = [];

    // determine if a social icon tweak is active
    bodyClassnames.forEach((cn) => {
      iconClassname.push(cn.indexOf('tweak-social-icons-style-'));
    });

    // sort through the body classnames and save the tweak name for later
    let classNameToCache = bodyClassnames.filter((className) => {
      return !className.indexOf('tweak-social-icons-style-');
    });

    currentIconStyle = classNameToCache[0];
    // if the correct tweak name exists, no need to reset.
    needsIconStyleReset = (currentIconStyle === navSocialIconsStyle) ? false : true;

    if (needsIconStyleReset) {
      core.log('Navigation: icon style tweak [' + currentIconStyle + '] will be reset on nav open');
    }
  },

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

    if (needsIconStyleReset) {
      core.dom.body.classList.remove(currentIconStyle);
      core.dom.body.classList.add(navSocialIconsStyle);
    }

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

    if (needsIconStyleReset) {
      core.dom.body.classList.remove(navSocialIconsStyle);
      core.dom.body.classList.add(currentIconStyle);
    }

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
    this.getIconStyle();
  }
};

export default Navigation;