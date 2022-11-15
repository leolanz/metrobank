import React, { useState } from "react";
import CamTemplate from "../../templates/CamTemplate";
import Webcam from "react-webcam";
import "./DocId.scss";
import { useDispatch } from "react-redux";
import { setPreviewDoc } from "../../redux/features/cam";

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
    dispatch(setPreviewDoc(file));
  };

  return (
    <div className="page-docid">
      <CamTemplate
        webcamRef={webcamRef}
        setImage={handleReduxImage}
        videoConstraints={videoConstraints}
        setVideoConstraits={handleChangeVideoConstraits}
        title="Escanea tu documento ID"
        url="/BEN/docID"
        urlPreview="/BEN/docID/preview"
        progressCount={2}
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
