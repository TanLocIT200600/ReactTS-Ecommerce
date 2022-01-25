import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import './modal.scss';

const Modal = (props: any) => {

  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(props.active);
  }, [props.active]);

  return (
    <div id={props.id} className={`modal ${active ? 'active' : ''}`}>
      {props.children}
    </div>
  );
}

Modal.propTypes = {
  active: PropTypes.bool,
  id: PropTypes.string
}

export const ModalContent = (props: any) => {

  const contentRef = React.useRef<HTMLDivElement>(null);

  const closeModal = () => {
    // let myClassName = document.getElementsByClassName("modal__content");
    // // contentRef.current.parentNode.classList.remove('active');
    // myClassName.parentNode.classList.remove('active')
    // if (myClassName.parentNode) myClassName.parentNode.removeChild(myClassName)
    if (props.onClose) props.onClose();
  }

  return (
    <div ref={contentRef} className="modal__content">
      {props.children}
      <div className="modal__content__close" onClick={closeModal}>
        <i className="fas fa-times"></i>
      </div>
    </div>
  )
}

ModalContent.propTypes = {
  onClose: PropTypes.func
}

export default Modal;