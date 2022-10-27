import React, { useState } from "react";
import Webcam from "react-webcam";
import { useDispatch } from "react-redux";
import CamTemplate from "../../templates/CamTemplate";
import { setPreviewImage } from "../../redux/features/cam";
import "./selfie.scss";

const initialRef = null;

const Selfie = () => {
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
    <div className="page-selfie">
      <CamTemplate
        webcamRef={webcamRef}
        setImage={handleReduxImage}
        videoConstraints={videoConstraints}
        setVideoConstraits={handleChangeVideoConstraits}
        title="Tómate una foto Selfie"
        url="/selfie-picture"
        urlPreview="/selfie-preview"
        progressCount={1}
      >
        <div className="camMask"></div>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
        />
      </CamTemplate>
    </div>
  );
};

export default Selfie;
