/**
 * @public
 * @module util
 * @description App-wide utility methods
 */
import { ImageLoader } from '@squarespace/core';
import controller from '@squarespace/controller';
const WebFont = require('webfontloader');

/**
 * @public
 * @method loadImages
 * @param  {[array]} images An array of image elements to load
 */
const loadImages = (images) => {
  images.forEach((image) => {
    ImageLoader.load(image, { load: true });
  });
};

/**
 *
 * @description Module isElementInViewport method, handles element boundaries
 * @method isElementInViewport
 * @param {object} el The DOMElement to check the offsets of
 * @memberof util
 * @returns {boolean}
 *
 */
const isElementInViewport = (el) => {
  if (el) {
    const bounds = el.getBoundingClientRect();

    return (bounds.top < window.innerHeight && bounds.bottom > 0);
  }
};

/**
 *
 * @description Single instance of webfontloader.
 *              Loads app fonts from Google CDN with local fallbacks.
 *              Uses a cookie to load cached fonts.
 * @method loadFonts
 * @memberof util
 * @returns {object} {init}
 *
 */
const loadFonts = () => {
  const handleActive = () => {
    // manipulate session storage to detect if font is cached
    sessionStorage.setItem('fonts', 'true');
  };

  const WebFontConfig = {
    // Try google cdn first
    google: {
      families: ['Comfortaa:400,700']
    },
    active: handleActive,
    // If CDN fails, use local fallback
    fontinactive: (family, fvd) => {
      if (family === 'Comfortaa') {
        WebFont.load({
          custom: {
            families: ['Comfortaa:n4,n7'],
          },
          active: handleActive
        });
      }
    },
  };

  const init = () => {
    // If font is cached, add the active class as soon as possible.
    if (sessionStorage.fonts) {
      document.documentElement.classList.add('wf-active');
    }
    WebFont.load(WebFontConfig);
  };

  return { init };
};

/**
 *
 * @name sqscontroller
 * @memberof core.util
 * @description a local namespaced version of @squarespace/controller for us in the app.
 */
const sqscontroller = controller;

export {
  loadImages,
  isElementInViewport,
  loadFonts,
  sqscontroller
};
