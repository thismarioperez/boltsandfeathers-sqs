import * as core from '../core';
import Typed from 'typed.js';

/**
 *
 * @public
 * @namespace TypeAnim
 * @description Starts typed.js on an element
 * @memberof controller
 * @todo Add mutationObserver to run getIconStyle() when cms changes are made.
 *
 */
function TypeAnim(element) {
  let typed = null,
    link,
    urlSrc,
    typeSrc,
    strings;

  // easily find the element that typed.js is being run on.
  element.classList.add('typed-active');

  /**
   *
   * @private
   * @description sets up a href target for the typed.js element.
   * @method setupLink
   * @memberof TypedAnim
   */
  const setupLink = () => {
    link = core.dom.doc.querySelector('[data-typeanim-link]');
    urlSrc = core.dom.doc.querySelector('#homepage-type-source a');
    if (urlSrc) {
      core.log(urlSrc);
      link.setAttribute('href', urlSrc.getAttribute('href'));
    } else {
      link.setAttribute('href', '/contact');
    }
  };

  /**
   *
   * @private
   * @description gets the string values to pass into typed.js instance.
   * @method getStrings
   * @memberof TypedAnim
   */
  const getStrings = () => {
    typeSrc = Array.from(core.dom.doc.querySelectorAll('#homepage-type-source p, ' +
      '#homepage-type-source h1, ' +
      ' #homepage-type-source h2, ' +
      '#homepage-type-source h3, ' +
      '#homepage-type-source blockquote'));
    strings = typeSrc.map((el) => el.innerHTML);

    strings.forEach((string) => {
      string.split('& ').join('&amp; ');
    });
  };

  /**
   *
   * @private
   * @description kicks things off
   * @method init
   * @memberof TypedAnim
   */
  const init = () => {
    setupLink();
    getStrings();
    typed = new Typed('.typed-active', {
      strings: strings,
      typeSpeed: 75,
      backSpeed: 40,
      backDelay: 1000,
      startDelay: core.config.pageTransition,
      loop: true
    });
  };

  const destroy = () => {
    typed.destroy();
    typed = null;
  };

  const sync = () => {
    destroy();
    init();
  };

  init();

  core.log('TypeAnim Running');
  // core.log(link);
  // core.log(typeSrc);
  // core.log(strings);

  return {
    sync,
    destroy
  };

}

export default TypeAnim;