import * as core from '../core';
import VanillaModal from 'vanilla-modal';

function Modal(element) {
  let modal = null;

  const options = {
    page: 'html',
    loadClass: 'is-modal-active',
    class: 'is-modal-visible',
  };

  const init = () => {
    core.log('Modal started');
    modal = new VanillaModal(options);
  };

  const destroy = () => {
    if (modal) {
      modal.destroy();
      modal = null;
    }
  };

  const sync = () => {
    destroy();
    init();
  };

  init();

  return {
    sync,
    destroy
  };
}

export default Modal;