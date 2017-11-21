import ImageHandler from '../class/ImageHandler';

/**
 * @public
 * @name ImageController
 * @description Lazy loads images if they are in the viewport
 */
function ImageController (element) {
  let handleImages = null;

  const init = () => {
    handleImages = new ImageHandler(element);
  };

  const destroy = () => {
    handleImages.destroy();
    handleImages = null;
  };

  const sync = () => {
    handleImages.sync();
  };

  init();

  return {
    destroy,
    sync
  };
}

export default ImageController;