/**
 * @public
 * @module util
 * @description App-wide utility methods
 */
import dom from './dom';
import { ImageLoader } from '@squarespace/core';

/**
 *
 * @description Add pixel units when inline styling
 * @method px
 * @param {string} str The value to pixel-ify
 * @memberof util
 * @returns {string}
 *
 */
const px = function ( str ) {
  return `${str}px`;
};

/**
 *
 * @description Module onImageLoadHander method, handles event
 * @method isElementLoadable
 * @param {object} el The DOMElement to check the offset of
 * @memberof core.util
 * @returns {boolean}
 *
 */
const isElementLoadable = function ( el ) {
  let ret = false;

  if ( el ) {
    const bounds = el.getBoundingClientRect();

    ret = ( bounds.top < (window.innerHeight * 2) );
  }

  return ret;
};

/**
 *
 * @description Module isElementVisible method, handles element boundaries
 * @method isElementVisible
 * @param {object} el The DOMElement to check the offsets of
 * @memberof core.util
 * @returns {boolean}
 *
 */
const isElementVisible = function ( el ) {
  let ret = false;

  if ( el ) {
    const bounds = el.getBoundingClientRect();

    ret = ( bounds.top < window.innerHeight && bounds.bottom > 0 );
  }

  return ret;
};

/**
 * @public
 * @description Easily determine what elements are in view from a given array.
 * @method getElementsInView
 * @memberof util
 * @param  {[array]} nodes An array of nodes to check if they are in view.
 */
const getElementsInView = function ( nodes ) {
  let i = nodes.length;
  const ret = [];

  for ( i; i--; ) {
    if ( isElementVisible( nodes[ i ] ) ) {
      ret.push( nodes[ i ] );
    }
  }

  return ret;
};

/**
 * @public
 * @description Easily load images with a filter option
 * @method loadImages
 * @memberof util
 * @param  {[array]} images Optional array of images to load
 * @param {function} handler Optional handler for load conditions
 */
const loadImages = ( images, handler ) => {
  // Normalize the handler
  handler = (handler || isElementLoadable);

  // Normalize the images
  images = (images || Array.from(dom.doc.querySelectorAll('img[data-src]')));

  // Load images that pass the filter test.
  images.filter((img) => handler(img)).forEach((img) => {
    ImageLoader.load(img, { load: true });
    img.setAttribute('data-load', true);
  });
};

/*******************************************************************************
 * Export
 ******************************************************************************/
export {
  px,
  isElementLoadable,
  isElementVisible,
  getElementsInView,
  loadImages
};
