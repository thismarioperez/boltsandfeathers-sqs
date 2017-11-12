/**
 * @public
 * @module util
 * @description App-wide utility methods
 */
import { ImageLoader } from '@squarespace/core';
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
 * @description Loads app fonts from Google CDN with local fallbacks
 * @method loadFonts
 * @memberof util
 *
 */
const loadFonts = () => {
  WebFont.load({
    google: {
      families: ['Comfortaa:400,700']
    },
    fontinactive: (family, fvd) => {
      if (family === 'Comfortaa') {
        WebFont.load({
          custom: {
            families: ['Comfortaa:n4,n7'],
          }
        });
      }
    },
  });
};

export {
  loadImages,
  isElementInViewport,
  loadFonts
};
