import * as core from '../core';

/**
 *
 * @private
 * @name whichTransitionEvent
 * @description Get the transition event name
 * @see  adapted from Modernizr: https://modernizr.com
 */
const whichTransitionEvent = function () {
  const el = document.createElement('fakeelement');
  const transitions = {
    'transition': 'transitionend',
    'OTransition': 'oTransitionEnd',
    'MozTransition': 'transitionend',
    'WebkitTransition': 'webkitTransitionEnd'
  };

  for (var t in transitions) {
    if (el.style[t] !== undefined) {
      return transitions[t];
    }
  }
};

/**
 *
 * @public
 * @method ToggleContent
 * @memberof router
 * @param {{obj}} element element object
 * @description Toggles visiblity of a js-toggle-content element adjacent to the element parameter
 */
function ToggleContent(element) {
  let el = element;
  let target = el.nextElementSibling;
  let transition = whichTransitionEvent();

  // Get the natural height of an element
  const getHeight = (elem) => {
    let ret;

    elem.style.display = 'block'; // Make it visible
    ret = core.util.px(elem.scrollHeight); // Get it's height in pixels
    elem.style.display = ''; //  Hide it again

    return ret;
  };

  const show = (elem) => {

    let height = getHeight(elem);
    elem.classList.add('is-visible');
    elem.style.height = height; // Update the height
    // Once the transition is complete, remove the inline height so the content can scale responsively
    window.addEventListener(transition, function removeHeight(event) {
      if (!event.propertyName === 'height') {
        return;
      }
      elem.style.height = '';
      window.removeEventListener(transition, removeHeight, false);
    }, false);

    core.log(`[${target.localName}] + ${target.classList[0]} is visible`);
  };

  const hide = (elem) => {

    let height = getHeight(elem);
    elem.style.height = height;
    // Set the height back to 0
    window.setTimeout(() => {
      elem.style.height = '0';
    }, 1);
    // When the transition is complete, hide it
    window.addEventListener(transition, function removeVisibility(event) {
      if (!event.propertyName === 'height') {
        return;
      }
      elem.classList.remove('is-visible');
      elem.style.height = ''; // reset to nothing
      window.removeEventListener(transition, removeVisibility, false);
    }, false);

    core.log(`[${target.localName}] + ${target.classList[0]} is hidden`);
  };

  const toggle = (elem, timing) => {

    // If the element is visible, hide it
    if (elem.classList.contains('is-visible')) {
      hide(elem);
      return;
    }

    // Otherwise, show it
    show(elem);

  };

  const handleClick = (e) => {
    e.preventDefault();
    toggle(target);
  };

  const bindListeners = () => {
    el.addEventListener('click', handleClick);
  };

  const destroy = () => {
    el.removeEventListener('click', handleClick);
  };

  const init = () => {
    bindListeners();
  };

  init();

  return {
    destroy
  };
}

export default ToggleContent;