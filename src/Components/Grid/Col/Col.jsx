import React from 'react';

const Col = (props) => {
  return (
    <>
      <div className={`col size-${props?.size ? props?.size : 12}`}>{props.children}</div>
    </>
  );
};

export default Col;
