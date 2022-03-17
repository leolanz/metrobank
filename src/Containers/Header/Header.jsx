import React from 'react';
import './header.scss';
import ChevronLeftOutlinedIcon from '@material-ui/icons/ChevronLeftOutlined';
import { RequireContext } from '../../Context';

const Header = ({ leftTitle, rightTitle, ...props }) => {
  const [require, setRequire] = React.useContext(RequireContext); // Llamamos el contexto de require

  return (
    <>
      <div className="header-wrapper">
        <div className={`header-rs ${props.channel === 'BEN' ? 'ben' : ''}`}>
          <div
            onClick={() => {
              console.log('aqui');
              props?.back();
            }}
            className="back"
          >
            <ChevronLeftOutlinedIcon />
            <div className="title left">
              <p fontWeight="fontWeightBold">{leftTitle}</p>
            </div>
          </div>
          <div className="title">
            <p fontWeight="fontWeightBold">{props.title}</p>
          </div>
        </div>

        <div className="header-desk">
          <div
            onClick={() => {
              props?.back();
            }}
            className="back"
          >
            <div className="title right">
              <p fontWeight="fontWeightBold">{rightTitle}</p>
            </div>
            <div className="ic-back">
              <ChevronLeftOutlinedIcon />
            </div>
            <p className="text">Anterior</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Header;
