import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setPreviewImage } from "../../redux/features/cam";
import "./OCR.scss";
import CamTemplate from "../../templates/CamTemplate";
import OCRData from "./OCRData/OCRData";
const initialRef = null;

const OCR = () => {
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
        title="Confirma tus Datos"
        url="/BEN/selfie/take-photo"
        urlPreview="/BEN/selfie/preview"
        progressCount={3}
        noFooter
        noCam
      >
        <OCRData channel="BEN" active={3} />
      </ CamTemplate>
    </div>
  );
};

export default OCR;
