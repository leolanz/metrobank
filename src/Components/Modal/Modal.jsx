import React from 'react';
import CloseIcon from '@material-ui/icons/Close';

import './modal.scss';

const Modal = ({ show, close, title, children, ben }) => {
  return (
    <>
      <div
        className={`modal-wrapper ${!show ? 'hidden' : 'visible'}`}
        // onClick={() => {
        //   console.log('toco');
        //   props.close();
        // }}
      >
        <div className="modal-container">
          <div className={`modal-header ${ben ? 'ben' : ''}`}>
            <p className="title-header text-bold">{title}</p>
            <div
              className="ic-close"
              onClick={() => {
                close();
              }}
            >
              <CloseIcon />
            </div>
          </div>
          <div className="modal-content">{children}</div>
        </div>
      </div>
    </>
  );
};
export default Modal;
