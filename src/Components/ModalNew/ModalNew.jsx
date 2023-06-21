import React from 'react';
import CloseIcon from '@material-ui/icons/Close';

import './ModalNew.scss';

const ModalNew = ({ show, close, title, children, ben }) => {
  return (
    <>
      <div
        className={`modalNew-wrapper ${!show ? 'hidden' : 'visible'}`}
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
export default ModalNew;
