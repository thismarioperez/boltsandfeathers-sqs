import * as core from '../core';
const navSocialIconsStyle = 'tweak-social-icons-style-regular';
let currentIconStyle;
let needsIconStyleReset;

/**
 *
 * @public
 * @namespace NavSocialIcons
 * @description Toggles the appropriate social icon style when navigation is open
 * @memberof controller
 * @todo Add mutationObserver to run getIconStyle() when style editor changes are made.
 *
 */
const NavSocialIcons = {
  /**
   *
   * @private
   * @description Determines whether icon styles need to be reset when navigation is opened.
   * @method getIconStyle
   * @memberof NavSocialIcons
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
      core.log('NavSocialIcons: icon style tweak [' + currentIconStyle + '] will be reset on nav open');
    }
  },

  handleOpen() {
    if (needsIconStyleReset) {
      core.dom.body.classList.remove(currentIconStyle);
      core.dom.body.classList.add(navSocialIconsStyle);
    }
  },

  handleClose() {
    if (needsIconStyleReset) {
      core.dom.body.classList.remove(navSocialIconsStyle);
      core.dom.body.classList.add(currentIconStyle);
    }
  },

  init() {
    this.getIconStyle();
    core.emitter.on('app--navigation-open', this.handleOpen.bind(this));
    core.emitter.on('app--navigation-close', this.handleClose.bind(this));
  }
};

export default NavSocialIcons;