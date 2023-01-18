import React, { useState } from "react";
import CamTemplate from "../../templates/CamTemplate";
import Webcam from "react-webcam";
import "./DocId.scss";
import { useDispatch } from "react-redux";
import { setPreviewDoc } from "../../redux/features/cam";

const initialRef = null;

const DocID = () => {
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
        title="Foto de la Cédula"
        url="/BEN/docID"
        urlPreview="/BEN/docID/preview"
        progressCount={2}
      >
        <div className="camMask"></div>
        <Webcam
          onError={(e) => console.log("on error", e)}
          onUserMediaError={(e) => console.log("on user media error", e)}
          audio={false}
          forceScreenshotSourceSize={false}
          ref={webcamRef}
          imageSmoothing={false}
          screenshotFormat="image/png"
          screenshotQuality={1}
          videoConstraints={videoConstraints}
        />
      </CamTemplate>
    </div>
  );
};

export default DocID;
