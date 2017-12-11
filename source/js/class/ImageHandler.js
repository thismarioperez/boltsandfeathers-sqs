import * as util from '../core/util';
import log from '../core/log';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';

/**
 *
 * @public
 * @class ImageHandler
 * @param {el} element The element that has images to handle.
 * @classdesc Handles initial load, lazy loading, and resize loading of images.
 *            Does not handle intial loading of images in sqs-block containers (but does resize them).
 *
 */
class ImageHandler {
  constructor(element) {
    this.root = element;
    this.images = [];
    this.loadQueue = [];
    this.handleResize = debounce(this.handleLoading.bind(this), 120);
    this.handleScroll = throttle(this.handleLoading.bind(this), 100);

    this.init();
  }

  /**
   *
   * @private
   * @method preLoad
   * @memberof ImageHandler
   * @description Caches images to load.
   */
  preLoad () {
    this.images = Array.from(this.root.querySelectorAll('img[data-src]:not([data-item-banner])'));
  }

  /**
   *
   * @private
   * @method getImagesToLoad
   * @memberof ImageHandler
   * @param {object} evt Optional event object
   * @description scans document and returns images
   *              that have not been loaded
   */
  getImagesToLoad (evt) {
    // normalize event object
    evt = evt || { type: '' };

    // Select images to lazy load on scroll, and only resize loaded images on window resize.
    let query = (evt.type === 'resize') ? 'img[src]' : 'img.lazy-load:not([src])';

    this.loadQueue = this.images.filter((img) => img.matches( query ));

    // log the amount of images in the queue
    if (this.loadQueue.length > 0) {
      log('ImageHandler: ' + evt.type + ' queue: ' + this.loadQueue.length);
    }

  }

  /**
   *
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

    // handle the resize event
    if (evt.type === 'resize') {
      util.loadImages(this.loadQueue);
      return;
    }

    // not resizing, so only lazy load our own images.
    util.loadImages(this.loadQueue, util.isElementVisible, true);
  }

  /**
   *
   * @private
   * @method bindListeners
   * @memberof ImageHandler
   * @description binds resize and scroll event handlers.
   */
  bindListeners () {
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('scroll', this.handleScroll);
  }

  /**
   *
   * @private
   * @method init
   * @memberof ImageHandler
   * @description start everything
   */
  init () {
    this.preLoad();
    this.handleLoading();
    this.bindListeners();
  }

  /**
   *
   * @public
   * @method destroy
   * @memberof ImageHandler
   * @description unbinds event handlers.
   */
  destroy () {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('scroll', this.handleScroll);
  }

  /**
   *
   * @public
   * @method sync
   * @memberof ImageHandler
   * @description resets class elements. Call this after ajax load.
   */
  sync () {
    this.images = [];
    this.loadQueue = [];
    this.preLoad();
    this.handleLoading();
  }
}

/***********************************************************************
 * Export
 **********************************************************************/
export default ImageHandler;