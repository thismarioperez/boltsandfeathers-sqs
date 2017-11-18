const WebFont = require('webfontloader');
import * as core from '../core';


/**
 *
 * @description Single instance of webfontloader.
 *              Loads app fonts from Google CDN with local fallbacks.
 *              Uses a cookie to load cached fonts.
 * @function LoadFonts
 * @memberof controller
 *
 */
const LoadFonts = {};

LoadFonts.handleActive = () => {
  // manipulate session storage to detect if font is cached
  sessionStorage.setItem('fonts', 'true');
};

LoadFonts.config = {
  // Try google cdn first
  google: {
    families: ['Comfortaa:400,700']
  },
  active: () => {
    core.log('LoadFonts: fonts loaded from google fonts CDN');
    LoadFonts.handleActive();
  },
  // If CDN fails, use local fallback
  fontinactive: (family, fvd) => {
    core.log('LoadFonts: google fonts CDN is down. Falling back to local fonts');

    if (family === 'Comfortaa') {
      WebFont.load({
        custom: {
          families: ['Comfortaa:n4,n7'],
        },
        active: LoadFonts.handleActive
      });
    }
  },
};

LoadFonts.init = () => {
  // If font is cached, add the active class as soon as possible.
  if (sessionStorage.fonts) {
    document.documentElement.classList.add('wf-active');
  }
  WebFont.load(LoadFonts.config);
  core.log('LoadFonts: initialized');
};

export default LoadFonts;