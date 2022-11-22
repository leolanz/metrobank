import React, { useState, Suspense, lazy } from "react";
import { useDispatch } from "react-redux";
import CamTemplate from "../../templates/CamTemplate";
import { setPreviewImage } from "../../redux/features/cam";
import "./PepActivity.scss";
import Activity from "./Activity/Activity";
const initialRef = null;

const PepActivity = () => {
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
    <div className="page-pepactivy">
      <CamTemplate
        webcamRef={webcamRef}
        setImage={handleReduxImage}
        videoConstraints={videoConstraints}
        setVideoConstraits={handleChangeVideoConstraits}
        title="Información adicional"
        url="/BEN/selfie"
        urlPreview="/BEN/selfie/preview"
        progressCount={4}
        noFooter
        noCam
      >
        <Activity
          channel="BEN"
          active={3}
          /* next={handleNext}
                back={handleBack}
                goTo={(step) => goToBack(step)} */
        />
      </CamTemplate>
    </div>
  );
};

export default PepActivity;
