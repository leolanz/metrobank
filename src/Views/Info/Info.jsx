import React, { useState } from "react";
import { useDispatch } from "react-redux";
import CamTemplate from "../../templates/CamTemplate";
import { setPreviewImage } from "../../redux/features/cam";
import { useQuery } from "../../Hooks/useQuery";
import "./Info.scss";
import UserData from "./UserData/UserData";

const initialRef = null;

const Selfie = () => {
  const dispatch = useDispatch();
  const query = useQuery();
  console.log(query);
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
        title="Confirmación de datos"
        url="/BEN/selfie/take-photo"
        urlPreview="/BEN/selfie/preview"
        progressCount={3}
        noFooter
      >
        <UserData
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

export default Selfie;
