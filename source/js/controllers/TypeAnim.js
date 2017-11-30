import * as core from '../core';
import Typed from 'typed.js';

function TypeAnim(element) {
  let typed = null,
    link = core.dom.doc.querySelector('[data-typeanim-link]'),
    typeSrc = Array.from(core.dom.doc.querySelectorAll('#homepage-type-source p, ' +
    '#homepage-type-source h1, ' +
    ' #homepage-type-source h2, ' +
    '#homepage-type-source h3, ' +
    '#homepage-type-source blockquote')),
    strings = typeSrc.map((el) => el.innerHTML);

  strings.forEach((string) => {
    string.split('& ').join('&amp; ');
  });

  element.classList.add('typed-active');

  const setupLink = () => {
    const urlSrc = core.dom.doc.querySelector('#homepage-type-source a');
    if (urlSrc) {
      core.log(urlSrc);
      link.setAttribute('href', urlSrc.getAttribute('href'));
    } else {
      link.setAttribute('href', '/contact');
    }
  };

  const init = () => {
    setupLink();
    typed = new Typed('.typed-active', {
      strings: strings,
      typeSpeed: 70,
      backSpeed: 40,
      startDelay: core.config.pageTransition,
      loop: true
    });
  };

  const destroy = () => {
    typed.destroy();
    typed = null;
  };

  init();

  core.log('TypeAnim Running');
  core.log(link);
  core.log(typeSrc);
  core.log(strings);

  return {
    destroy
  };
  
}

export default TypeAnim;