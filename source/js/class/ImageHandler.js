import * as util from '../core/util';
import log from '../core/log';
import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';

/**
 *
 * @public
 * @class ImageHandler
 * @param {el} element The element that has images to handle.
 * @classdesc Handles initial load, lazy loading, and resize loading of images.
 * @memberof core
 *
 */
class ImageHandler {
  constructor(element) {
    this.root = element;
    this.images = [];
    this.loadQueue = [];
    this.handleScroll = throttle(this.handleLoading, 100);
    this.handleResize = debounce(this.handleLoading, 120);

    this.init();
  }

  /**
   * @private
   * @method preLoad
   * @memberof ImageHandler
   * @description Caches images to load.
   *              Prevents images from loading by calling ImageLoader with loadMode = 'viewport'.
   *              Strips src attributes to prevent network requests.
   *              Adds lazy load attribute.
   */
  preLoad () {
    this.images = Array.from(this.root.querySelectorAll('img[data-src]'));
    util.loadImages(this.images, util.isElementLoadable, 'viewport');
    this.images.forEach((img) => {
      img.removeAttribute('src');
      img.setAttribute('data-lazy-loaded', false);
    });
  }

  /**
   * @private
   * @method getImagesToLoad
   * @memberof ImageHandler
   * @param {object} evt Optional event object
   * @description scans document and returns images
   *              that have not been loaded
   */
  getImagesToLoad (evt) {
    // normalize event object
    evt = evt || { type: 'load' };

    const query = (evt.type === 'resize') ? 'img[data-lazy-loaded="true"]' : 'img[data-lazy-loaded="false"]';

    this.loadQueue = this.images.filter((img) => img.matches(query));
  }

  /**
   * @private
   * @method handeLoading
   * @memberof ImageHandler
   * @param {object} evt Optional event object
   * @description handles the loading of images based on an event type or if image is visible.
   */
  handleLoading (evt) {
    // normalize event object
    evt = evt || { type: 'load' };

    // get images to load
    this.getImagesToLoad(evt);

    // log the amount of images in the queue
    if (this.loadQueue.length > 0) {
      log('ImageHandler: ' + evt.type + ' queue: ' + this.loadQueue.length);
    }

    // handle the resize event
    if (evt.type === 'resize') {
      util.loadImages(this.loadQueue);
      return;
    }

    // handle any other type of event
    util.loadImages(this.loadQueue, util.isElementVisible);
  }

  /**
   * @private
   * @method bindListeners
   * @memberof ImageHandler
   * @description binds resize and scroll event handlers.
   */
  bindListeners () {
    window.addEventListener('scroll', this.handleScroll.bind(this));
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  /**
   * @private
   * @method init
   * @memberof ImageHandler
   * @description start everything
   */
  init () {
    this.preLoad();
    this.getImagesToLoad();
    this.handleLoading();
    this.bindListeners();
  }

  /**
   * @public
   * @method destroy
   * @memberof ImageHandler
   * @description unbinds event handlers.
   */
  destroy () {
    window.removeEventListener('scroll', this.handleScroll.bind(this));
    window.removeEventListener('resize', this.handleResize.bind(this));
  }

  /**
   * @public
   * @method sync
   * @memberof ImageHandler
   * @description resets class elements. Call this after ajax load.
   */
  sync () {
    this.images = [];
    this.loadQueue = [];
    this.preLoad();
    this.getImagesToLoad();
    this.handleLoading();
  }
}

/***********************************************************************
 * Export
 **********************************************************************/
export default ImageHandler;