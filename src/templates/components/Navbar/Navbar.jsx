import React, { memo } from "react";
import { useLocation, useHistory } from "react-router-dom";
import BackArrow from "../../../resources/icons/whiteBack.svg";
import ChangeCam from "../../../resources/icons/changecam.svg";
import ProgressBar from "../../../Components/ProgressBar/ProgressBar";
import "./Navbar.scss";
const Navbar = memo(({ title, changeVideoConstraints, progressCount = 1 }) => {
  const { pathname } = useLocation();
  const history = useHistory();

  const handleBack = () => {
    history.goBack();
  };

  return (
    <div className="back-nav">
      {/* {!pathname.includes("success") && !pathname.includes("info") && (
        <div className="icon" onClick={handleBack}>
          <img src={BackArrow} alt="backArrow" />
        </div>
      )} */}
      <div className="title">{title}</div>
      {/* {changeVideoConstraints && (
        <div className="changeCam" onClick={changeVideoConstraints}>
          <img src={ChangeCam} alt="ChangeCam" />
        </div>
      )} */}

      {/* <div className={`numbers-container`}>
        <ProgressBar items={3} cont={progressCount} />
      </div> */}
    </div>
  );
});
Navbar.displayName = "Navbar";
export default Navbar;
