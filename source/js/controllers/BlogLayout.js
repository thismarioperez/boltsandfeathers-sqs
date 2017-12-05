import debounce from 'lodash/debounce';
import * as core from '../core';
import TopAlign from '../class/LayoutTop';
import Ajax from '../class/BlogAjax';
import AnimateEls from '../class/AnimateEls';

/**
 * Handles building the blog grid, setting up ajax page loading, and tweak listeners.
 */
function BlogLayout (element) {
  // const loadingSpinner = document.querySelector('.loading-spinner');
  let grid;
  let animationHandler;
  let nextPageHandler;
  let animatedEls = [];
  const gridWrapper = element;
  let windowWidth = window.innerWidth;

  const getElsToAnimate = () => {
    return Array.from(element.querySelectorAll('.entry--list'));
  };

  const startAnimations = () => {
    animatedEls = getElsToAnimate();
    animationHandler = new AnimateEls(animatedEls);
  };

  const stopAnimations = () => {
    animationHandler.stop();
  };

  const syncAnimations = () => {
    animationHandler.destroy();
    animationHandler = null;
    animatedEls = getElsToAnimate();
    animationHandler = new AnimateEls(animatedEls);
  };

  /**
   * Returns gutter value based on window width & the minColWidth tweak.
   */
  const getGutter = () => {
    const minColWidth = core.config.minColumnWidth;

    return 0.1 * minColWidth;
  };

  /**
   * Render the gallery.
   *
   * @param {Boolean} shouldDestroy - true = delete grid object and rebuild in new style
   */
  const render = (shouldDestroy) => {
    if (shouldDestroy && grid) {
      grid.destroy();
      grid = null;
    }

    grid = new TopAlign(gridWrapper, {
      gutter: getGutter(),
      maxColumns: core.config.maxNumberColumns,
      minColumnWidth: core.config.minColumnWidth,
      childSelector: 'entry--list',
      afterLayout: startAnimations,
      autoLoadImages: true,
      imageCropping: core.config.cropImagesSetting
    });
    grid.layout();
  };

  /**
   * First, hide all the items, then run grid.afterResize, then reveal the items.
   */
  const resizeHandler = () => {
    // check to see if the width actually changed to avoid running
    // when the bar comes in on scroll on ios.
    if (windowWidth === window.innerWidth) {
      return;
    }

    stopAnimations();

    animatedEls.forEach((item) => {
      item.classList.remove('is-active');
    });

    if (grid) {
      grid.afterResize();
    }

    windowWidth = window.innerWidth;
  };

  const debouncedResize = debounce(resizeHandler, 120);

  /**
   * Render the grid, bind the resize listener and the ajax listener.
   */
  const init = () => {
    render(false);
    window.addEventListener('resize', debouncedResize);

    nextPageHandler = new Ajax(element, {
      itemSelector: '.entry--list',
      loadMoreSelector: '.load-more',
      // pageEndSelector: '.footer',
      renderCallback: () => {
        render();
        syncAnimations();
      },
    });
    nextPageHandler.bindEventListener();
  };

  const destroy = () => {
    window.removeEventListener('resize', debouncedResize);
    nextPageHandler.unbindEventListener();
    nextPageHandler = null;
    animationHandler.stop();
    animationHandler = null;
  };

  init();

  return {
    destroy
  };
}

export default BlogLayout;
