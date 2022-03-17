import React from 'react';

import './progressBar.scss';

const ProgressBar = (props) => {
  const [width, setWidth] = React.useState({ width: '60%' });

  let percent = 100;

  React.useEffect(() => {
    percent = 100 / (props.items + 2);
    setWidth({ width: `${percent * props.cont}%` });
  }, [props.cont]);

  return (
    <>
      <div className="bar-content">
        <div className="bar-progress" style={width}></div>
      </div>
    </>
  );
};
export default ProgressBar;
