import debounce from 'lodash/debounce';
import * as core from '../core';
import TopAlign from '../class/LayoutTop';
import Ajax from '../class/BlogAjax';

/**
 * Handles building the blog grid, setting up ajax page loading, and tweak listeners.
 */
function BlogLayout (element) {
  // const loadingSpinner = document.querySelector('.loading-spinner');
  let grid;
  let nextPageHandler;
  const gridWrapper = element;
  // const footer = document.querySelector('.footer');
  let windowWidth = window.innerWidth;



  /**
   * After all items are placed, remove the hidden class on each one at an interval.
   */
  const gridReveal = () => {
    // loadingSpinner.classList.add('hidden');
    // footer.classList.remove('show');
    const items = element.querySelectorAll('.grid-hidden');
    let i = 0;
    const interval = setInterval(() => {
      if (items[i]) {
        items[i].classList.remove('grid-hidden');
        i++;
      } else {
        // footer.classList.add('show');
        clearInterval(interval);
        core.emitter.emit('blog--grid-revealed');
      }
    }, 130);
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
      const items = element.querySelectorAll('.entry--list');
      Array.from(items).forEach((item) => {
        item.classList.add('grid-hidden');
      });
      grid.destroy();
      grid = null;
    }

    grid = new TopAlign(gridWrapper, {
      gutter: getGutter(),
      maxColumns: core.config.maxNumberColumns,
      minColumnWidth: core.config.minColumnWidth,
      childSelector: 'entry--list',
      afterLayout: gridReveal,
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

    core.emitter.emit('blog--resize');

    const items = element.querySelectorAll('.entry--list');
    Array.from(items).forEach((item) => {
      item.classList.add('grid-hidden');
    });
    if (grid) {
      grid.afterResize();
    }
    gridReveal();
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
        core.emitter.emit('blog--ajax-load');
      },
    });
    nextPageHandler.bindEventListener();
  };

  const destroy = () => {
    window.removeEventListener('resize', debouncedResize);
    nextPageHandler.unbindEventListener();
    nextPageHandler = null;
  };

  init();

  return {
    destroy
  };
}

export default BlogLayout;
