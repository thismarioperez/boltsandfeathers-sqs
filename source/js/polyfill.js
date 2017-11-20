/*eslint-disable */
/**
 *
 * @description ChildNode.remove() polyfill for ie9 and higher
 * @see https://github.com/jserz/js_piece/blob/master/DOM/ChildNode/remove()/remove().md
 */
(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('remove')) {
      return;
    }
    Object.defineProperty(item, 'remove', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function remove() {
        if (this.parentNode !== null)
          this.parentNode.removeChild(this);
      }
    });
  });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);

/**
 *
 * @description window.requestAnimationFrame & window.cancelAnimationFrame polyfill
 * @see https://github.com/chrisdickinson/raf
 */
import 'raf/polyfill';

/**
 *
 * @description CHammertime-js 300ms click delay polyfill
 * @see http://hammerjs.github.io/
 */
import 'hammer-timejs';
/*eslint-enable */