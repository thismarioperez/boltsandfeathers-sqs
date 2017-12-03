import { VideoBackground as VideoBackgroundRenderer } from '@squarespace/video-background-rendering';
import * as core from '../core';

function BackgroundVideo(element, afterInitialize) {
  const rootNode = element.querySelector('.video-background');

  // stop if on mobile device and add mobile classname for fallback behavior
  if (core.detect.isMobile()) {
    rootNode.classList.add('mobile');
    return false;
  }


  const props = core.util.getPropsFromNode(rootNode);
  let renderer = new VideoBackgroundRenderer(props);

  const handleResize = () => {
    renderer.scaleVideo();
  };

  const handleTweak = () => {
    renderer.destroy();
    renderer = new VideoBackgroundRenderer(props);
  };

  if (typeof afterInitialize === 'function') {
    afterInitialize({
      handleResize,
      handleTweak
    });
  }

  return {
    destroy: () => {
      renderer.destroy();
    }
  };
}

export default BackgroundVideo;
