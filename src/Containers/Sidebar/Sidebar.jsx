import React from 'react';
import './sidebar.scss';

import LogoBNP from '../../Assets/logo.png';
import Powered from '../../Assets/powered.png';
import Newtech from '../../Assets/logo-newtech.png';

const Sidebar = (props) => {
  return (
    <>
      <div className="sidebar-box">
        <div className="sidebar-header">
          <img src={LogoBNP} alt="logo-BNP" />
          <div className="title">
            <h4>Bienvenido a BNP</h4>
          </div>
          <div className="description">
            <p className="text-light">Onboarding Digital</p>
          </div>

          <hr className="sidebar-separate" />
        </div>

        {props.children}

        <div className="sidebar-footer">
          <img src={Powered} alt="logo-BNP" />
          <img src={Newtech} alt="logo-BNP" />
        </div>
      </div>
    </>
  );
};
export default Sidebar;
