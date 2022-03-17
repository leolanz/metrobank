import React from 'react';
import './button.scss';
import { Link } from 'react-router-dom';

const Button = (props) => {
  return (
    <>
      {props?.as ? (
        <label
          className={`${props.color ? `btn-${props.color}` : `btn-primary`}  
          ${props?.full ? `full` : ``}    ${props?.disabled ? `disabled` : ``}
          ${props?.ben ? `ben` : ``}  
          `}
          {...props}
        >
          <div className="btn-content">
            {props?.icon ? <i>{props.icon}</i> : null}
            <p>{props.children}</p>
          </div>
        </label>
      ) : (
        <Link
          className={`${props.color ? `btn-${props.color}` : `btn-primary`}  
        ${props?.full ? `full` : ``}   ${props?.disabled ? `disabled` : ``}
        ${props?.ben ? `ben` : ``}   
        `}
          {...props}
          onClick={() => {
            if (!props?.disabled) {
              props?.onClick();
            }
          }}
          to={{ pathname: props?.href }}
        >
          <div className="btn-content">
            {props?.icon ? <i>{props.icon}</i> : null}
            <p>{props.children}</p>
          </div>
        </Link>
      )}
    </>
  );
};

export default Button;
