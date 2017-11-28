import { refresh } from '@squarespace/controller';
import { Lifecycle } from '@squarespace/core';
import Mercury from '@squarespace/mercury';
import * as core from './core';

// Exceptions: external links, hash links
const onClickExceptions = [
  '[data-no-ajax]'
];

// Exceptions after making the request. Does a string match for any of these
// in the responseText
const onRequestExceptions = [
  'sqs-slide-container',
  'sqs-search-page',
];

// updateMatrix indicates which elements need to be updated on load. You can
// choose whether to update attributes, replace HTML, or both.
const updateMatrix = [
  { selector: 'title', updateHTML: true },
  { selector: 'meta[property="og:title"]', updateAttrs: true },
  { selector: 'meta[property="og:latitude"]', updateAttrs: true },
  { selector: 'meta[property="og:longitude"]', updateAttrs: true },
  { selector: 'meta[property="og:url"]', updateAttrs: true },
  { selector: 'meta[property="og:type"]', updateAttrs: true },
  { selector: 'meta[property="og:description"]', updateAttrs: true },
  { selector: 'meta[property="og:image"]', updateAttrs: true },
  { selector: 'meta[itemprop="name"]', updateAttrs: true },
  { selector: 'meta[itemprop="url"]', updateAttrs: true },
  { selector: 'meta[itemprop="description"]', updateAttrs: true },
  { selector: 'meta[itemprop="thumbnailUrl"]', updateAttrs: true },
  { selector: 'meta[itemprop="image"]', updateAttrs: true },
  { selector: 'meta[name="twitter:title"]', updateAttrs: true },
  { selector: 'meta[name="twitter:image"]', updateAttrs: true },
  { selector: 'meta[name="twitter:url"]', updateAttrs: true },
  { selector: 'meta[name="twitter:card"]', updateAttrs: true },
  { selector: 'meta[name="twitter:description"]', updateAttrs: true },
  { selector: 'meta[name="twitter:url"]', updateAttrs: true },
  { selector: 'meta[name="description"]', updateAttrs: true },
  { selector: 'link[rel="canonical"]', updateAttrs: true },
  { selector: 'link[rel="image_src"]', updateAttrs: true },
  { selector: 'link[rel="alternate"]', updateAttrs: true },
  { selector: 'body', updateAttrs: true },
  { selector: '.js-header--title', updateHTML: true },
  { selector: '.js-navigation', updateHTML: true },
  { selector: '.js-page', updateHTML: true, updateAttrs: true }
];

/**
 *
 * @description Instantiates a mercury ajax loader
 * @method PageLoader
 *
 */
function PageLoader() {
  // Don't use ajax in authenticated session
  if ( core.env.isAuth() ) {
    return false;
  }

  const mercury = new Mercury({ // eslint-disable-line no-unused-vars
    enableCache: true,
    updateMatrix: updateMatrix,
    onClickExceptions: onClickExceptions,
    onRequestExceptions: onRequestExceptions,
    onLoad: () => {
      core.log('pageLoader: Ajax page loaded');
      Lifecycle.init();
      refresh();
      core.emitter.emit('app--page-ready');
    },
    onUnload: () => {
      Lifecycle.destroy();
      core.emitter.emit('app--page-loading');
      core.emitter.emit('app--navigation-close');
    },
    timeout: core.config.pageTransition
  });
}

export default PageLoader;