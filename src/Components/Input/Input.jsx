import React from 'react';

import './input.scss';

const Input = (props) => {
  const [focus, setFocus] = React.useState(false);
  const inputRef = React.useRef(null);
  return (
    <>
      {props?.type === 'textarea' ? (
        <div
          className={`wrapper-input textarea ${focus ? 'focus' : ''}  
          ${props?.error ? 'error' : ''} `}
          onClick={() => {
            setFocus(true);
            inputRef.current.focus();
            if (props?.onClick !== undefined) {
              props?.onClick();
            }
          }}
        >
          <textarea
            className="input"
            defaultValue={props?.defaultValue}
            placeholder={props.placeholder}
            ref={inputRef}
            type={`${props?.type ? props?.type : 'text'}`}
            value={props?.value}
            onChange={(data) => {
              props?.onChange(data);
            }}
            onBlur={() => {
              setFocus(false);
              console.log(focus);
              inputRef.current.focus();
              if (props?.onBlur !== undefined) {
                props?.onBlur();
              }
            }}
            {...props}
          />
        </div>
      ) : (
        <>
          {props.label && <label className="input-label">{props.label}</label>}
          <div
            className={`wrapper-input ${props.label ? 'label' : ''} ${focus ? 'focus' : ''}  ${
              props?.error ? 'error' : ''
            } ${props?.disabled ? 'disabled' : ''}`}
            onClick={() => {
              setFocus(true);
              inputRef.current.focus();
            }}
          >
            <div className="ic-input ic-left">{props?.iconLeft}</div>
            <input
              {...props}
              className="input"
              defaultValue={props?.defaultValue}
              placeholder={props.placeholder}
              ref={inputRef}
              type={`${props?.type ? props?.type : 'text'}`}
              value={props?.value}
              onChange={(data) => {
                props?.onChange(data);
              }}
              onBlur={() => {
                setFocus(false);
                if (props?.onBlur !== undefined) {
                  props.onBlur();
                }
              }}
            />
            <div className="ic-input ic-right">{props?.iconRight}</div>
          </div>
        </>
      )}

      <div className="text-error">{props?.error}</div>
    </>
  );
};
export default Input;
