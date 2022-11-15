import React, { useState, Suspense, lazy } from "react";
import { useDispatch } from "react-redux";
import CamTemplate from "../../templates/CamTemplate";
import { setPreviewImage } from "../../redux/features/cam";
import { useQuery } from "../../Hooks/useQuery";
import "./PepActivity.scss";
import Activity from "./Activity/Activity";
const LoadingModal = lazy(
  async () => await import("../../Components/LoadingModal/LoadingModal")
);

const initialRef = null;

const PepActivity = () => {
  const dispatch = useDispatch();
  const query = useQuery();
  console.log(query);
  const webcamRef = React.useRef(initialRef);
  const [videoConstraints, setVideoConstraits] = useState({
    facingMode: "environment",
  });

  const [loading, setLoading] = useState(false);

  const handleChangeVideoConstraits = (config) => {
    setVideoConstraits(config);
  };

  const handleReduxImage = (file) => {
    dispatch(setPreviewImage(file));
  };
  return (
    <div className="page-pepactivy">
      <Suspense fallback={null}>{loading && <LoadingModal />}</Suspense>
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
