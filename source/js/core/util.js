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
 * @param {string|boolean} loadMode Optional loadMode value for ImageLoader
 */
const loadImages = ( images, handler, loadMode) => {
  // Normalize the handler
  handler = (handler || isElementLoadable);

  // Normalize the images
  images = (images || Array.from(dom.doc.querySelectorAll('img[data-src]')));

  // Normalize loadMode
  loadMode = (loadMode || true);

  // Load images that pass the filter test.
  images.filter((img) => handler(img)).forEach((img) => {
    ImageLoader.load(img, { load: loadMode });
    img.addEventListener('load', function handleLoad() {
      img.setAttribute('data-lazy-loaded', true);
      img.removeEventListener('load', handleLoad);
    });
  });
};

/**
 * Returns an img's dimensions as a % of height/width from it's data-image-dimenstions attribute
 *
 * @param {HTMLElement}  img   Required
 */
const getImageRatio = (img) => {
  // this conditional is a hack to get around the fact that system placeholder
  // images get their data-image-dimensions attr set late
  if (img.getAttribute('data-image-dimensions') !== '') {
    const [ x, y ] = img.getAttribute('data-image-dimensions').split('x').map(dim => parseFloat(dim, 10));
    return 100 * y / x;
  }

  return 100;
};

/**
 * @public
 * @description Returns data props from video node
 * @method getPropsFromNode
 * @memberof util
 * @param  {element} node the video node
 */
const getPropsFromNode = function(node) {
  const props = {
    container: node
  };

  if (node.getAttribute('data-config-url')) {
    props.url = node.getAttribute('data-config-url');
  }

  if (node.getAttribute('data-config-playback-speed')) {
    props.playbackSpeed = node.getAttribute('data-config-playback-speed');
  }

  if (node.getAttribute('data-config-filter')) {
    props.filter = node.getAttribute('data-config-filter');
  }

  if (node.getAttribute('data-config-filter-strength')) {
    props.filterStrength = node.getAttribute('data-config-filter-strength');
  }

  return props;
};


/*******************************************************************************
 * Export
 ******************************************************************************/
export {
  px,
  isElementLoadable,
  isElementVisible,
  getElementsInView,
  loadImages,
  getImageRatio,
  getPropsFromNode
};
