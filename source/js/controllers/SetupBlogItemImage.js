import { ImageLoader } from '@squarespace/core';
import * as core from '../core';
import debounce from 'lodash/debounce';

/**
 * Adds a class to the body to constrain the banner image if it's
 * square or vertical so it doesn't take up too much of the page.
 */
function SetUpBlogItemImage (element) {

  const bannerImage = element.querySelector('img');
  const imgRatio = core.util.getImageRatio(bannerImage);

  const addBodyClass = () => {
    core.log(imgRatio);
    if (imgRatio <= 100 && imgRatio >= 75) {
      core.dom.body.classList.add('constrain-banner--mid');
    } else if (imgRatio > 100) {
      core.dom.body.classList.add('constrain-banner--narrow');
    }
  };

  const loadImage = () => {
    ImageLoader.load(bannerImage, {
      mode: 'fill',
      load: true,
      fixedRatio: true
    });
  };

  const loadBannerImage = () => {
    addBodyClass();
    loadImage();
  };

  const debouncedResize = debounce(loadImage, 200);

  const bindListeners = () => {
    window.addEventListener('resize', debouncedResize);
  };

  const init = () => {
    bindListeners();
    loadBannerImage();
  };

  const destroy = () => {
    window.removeEventListener('resize', debouncedResize);
    debouncedResize.cancel();
  };

  init();

  return {
    destroy
  };
}

export default SetUpBlogItemImage;
