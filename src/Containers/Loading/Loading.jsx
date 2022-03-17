import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import './loading.scss';

const Loading = (props) => {
  return (
    <>
      <div className="loading-wrapper">
        <CircularProgress />
        <p>Espere por favor...</p>
        {/* <div className="loading-content">
        </div> */}
      </div>
    </>
  );
};
export default Loading;
