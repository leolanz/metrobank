import React from 'react';
import './footer.scss';

const Footer = (props) => {
  return (
    <>
      <div
        className={`footer-box 
         ${props?.full ? 'full-width' : ''}
         align-content-${props?.contentAlign ? props?.contentAlign : 'right'}
           `}
      >
        <div
          className={`footer-content align-${props?.align ? props?.align : 'left'} ${
            props?.column ? 'column' : ''
          } `}
        >
          {props.children}
        </div>
      </div>
    </>
  );
};
export default Footer;
