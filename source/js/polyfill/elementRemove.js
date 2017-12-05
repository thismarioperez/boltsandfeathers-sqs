/**
 *
 * @see https://github.com/jserz/js_piece/blob/master/DOM/ChildNode/remove()/remove().md
 */
function polyfill() {
  if (typeof Element.prototype.remove !== 'function') {
    Element.prototype.remove = function () {
      this.parentElement.removeChild(this);
    };
  }
}

export default polyfill;
