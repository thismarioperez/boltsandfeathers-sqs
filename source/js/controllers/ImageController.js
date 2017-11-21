import * as core from '../core';
import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';

/**
 * @public
 * @name ImageController
 * @description Lazy loads images if they are in the viewport
 */
function ImageController (element) {
  let imagesToLoad,
    loadedImages;
  /**
   * @private
   * @name getImagesToLoad
   * @description scans document and returns images
   *              that have not been loaded
   */
  const getImagesToLoad = () => {
    return Array.from(element.querySelectorAll('img[data-src]:not([data-load="true"])'));
  };

  /**
   * @private
   * @name getLoadedImages
   * @description scans document and returns images
   *              that have already been loaded
   */
  const getLoadedImages = () => {
    return Array.from(element.querySelectorAll('img[data-load="true"]'));
  };

  /**
   * @private
   * @name checkImages
   * @description detects if image is in viewport, and loads it if true.
   */
  const initialLoad = () => {
    imagesToLoad = getImagesToLoad();
    // stop here if no images exist
    if (imagesToLoad.length <= 0) {
      return false;
    }
    core.log('ImageController: load queue: ' + imagesToLoad.length);
    core.util.loadImages(imagesToLoad, core.util.isElementVisible);
  };

  /**
   * @private
   * @name reloadImages
   * @description reloads images that have already been loaded.
   *              Use this on window resize
   */
  const reloadImages = () => {
    loadedImages = getLoadedImages();
    // stop here if no images exist
    if (loadedImages.length <= 0) {
      return false;
    }
    core.log('ImageController: resize queue: ' + loadedImages.length);
    core.util.loadImages(getLoadedImages());
  };

  const handleScroll = () => {
    initialLoad();
  };

  const throttledScroll = throttle(handleScroll, 180);

  const handleResize = () => {
    reloadImages();
  };

  const debouncedResize = debounce(handleResize, 120);

  const bindListeners = () => {
    window.addEventListener('resize', debouncedResize);
    window.addEventListener('scroll', throttledScroll);
  };

  const init = () => {
    bindListeners();
    initialLoad();
  };

  const destroy = () => {
    window.removeEventListener('resize', debouncedResize);
    window.removeEventListener('scroll', throttledScroll);
  };

  const sync = () => {
    initialLoad();
    reloadImages();
  };

  init();

  return {
    destroy,
    sync
  };
}

export default ImageController;