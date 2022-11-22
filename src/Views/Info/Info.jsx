import React, { useState } from "react";
import { useDispatch } from "react-redux";
import CamTemplate from "../../templates/CamTemplate";
import { setPreviewImage } from "../../redux/features/cam";
import "./Info.scss";
import UserData from "./UserData/UserData";
const initialRef = null;

const Info = () => {
  const dispatch = useDispatch();
  const webcamRef = React.useRef(initialRef);
  const [videoConstraints, setVideoConstraits] = useState({
    facingMode: "environment",
  });
  const handleChangeVideoConstraits = (config) => {
    setVideoConstraits(config);
  };

  const handleReduxImage = (file) => {
    dispatch(setPreviewImage(file));
  };
  return (
    <div className="page-info">
      <CamTemplate
        webcamRef={webcamRef}
        setImage={handleReduxImage}
        videoConstraints={videoConstraints}
        setVideoConstraits={handleChangeVideoConstraits}
        title="Confirmación de datos"
        url="/BEN/selfie/take-photo"
        urlPreview="/BEN/selfie/preview"
        progressCount={3}
        noFooter
        noCam
      >
        <UserData channel="BEN" active={3} />
      </CamTemplate>
    </div>
  );
};

export default Info;
