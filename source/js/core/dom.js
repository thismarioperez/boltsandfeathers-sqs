
/**
 * @public
 * @namespace dom
 * @memberof core
 * @description Holds high-level cached nodes.
 *
 */
const dom = {
  /**
   * @public
   * @member doc
   * @memberof core.dom
   * @description the cached document element
   */
  doc: document,

  /**
   * @public
   * @member html
   * @memberof core.dom
   * @description the cached documentElement node
   */
  html: document.documentElement,

  /**
   * @public
   * @member body
   * @memberof core.dom
   * @description the cached body node
   */
  body: document.body,

  /**
   * @public
   * @member app
   * @memberof core.dom
   * @description the cached app node
   */
  app: document.getElementById('app'),

  /**
   * @public
   * @member header
   * @memberof core.dom
   * @description the cached <header> node
   */
  header: document.querySelector('.js-header'),

  /**
   * @public
   * @member nav
   * @memberof core.dom
   * @description the cached <nav> node
   */
  nav: document.querySelector('nav'),

  /**
   * @public
   * @member page
   * @memberof core.dom
   * @description the cached <page> node
   */
  page: document.querySelector('.js-page'),

  /**
   * @public
   * @member doc
   * @memberof core.dom
   * @description the cached <intro> node
   */
  intro: document.querySelector('.js-intro')
};

export default dom;