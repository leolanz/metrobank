import React, { useState, useEffect } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { useDispatch } from "react-redux";
import CamTemplate from "../../templates/CamTemplate";
import { setPreviewImage } from "../../redux/features/cam";
import { useQuery } from "../../Hooks/useQuery";
import "./selfie.scss";
import { api } from "../../Connection/Connection";
import { useHistory } from "react-router-dom";
import { setPreviewDoc } from "../../redux/features/cam";
import Camera, { IMAGE_TYPES } from "react-html5-camera-photo";

const initialRef = null;

const Selfie = () => {
  const dispatch = useDispatch();
  const query = useQuery();
  console.log(query);
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const webcamRef = React.useRef(initialRef);
  const [videoConstraints, setVideoConstraits] = useState({
    facingMode: "user",
  });

  const handleChangeVideoConstraits = (config) => {
    setVideoConstraits(config);
  };

  const handleReduxImage = (file) => {
    dispatch(setPreviewImage(file));
  };

  useEffect(() => {
    const email = query.email;
    const phone = query.phone;
    let url = `${api.REACT_DOMAIN_BACK}/track?`;
    if (email) url += `email=${query.email}`;
    if (phone) url += `phone=${query.phone}`;
    if (email === undefined || phone === undefined) return;
    axios({
      method: "get",
      url,
    })
      .then(function (response) {
        const trackInfo = response.data;
        let url = "/BEN";
        console.log("trackInfo", trackInfo);
        if (trackInfo.track === "0") {
          setLoading(false);
          return;
        }
        if (trackInfo.track === "1") url += "/docID";
        if (trackInfo.track === "2") url += "/info";
        if (trackInfo.track === "3") url += "/activity";
        if (trackInfo.track === "4") url += "/success";
        history.push({
          pathname: url,
          state: { trackInfo },
          search: `${history.location.search}&requestNumber=${trackInfo.requestNumber}`,
        });
      })
      .catch(function (Error) {
        setLoading(false);
        console.log(Error);
      });
  }, []);

  if (loading) {
    <div className="page-selfie">
      <CamTemplate
        webcamRef={webcamRef}
        setImage={handleReduxImage}
        videoConstraints={videoConstraints}
        setVideoConstraits={handleChangeVideoConstraits}
        title="Foto selfie"
        url="/BEN/selfie"
        urlPreview="/BEN/selfie/preview"
        progressCount={1}
      >
        ...loading
      </CamTemplate>
    </div>;
  }
  function handleTakePhoto(dataUri) {
    console.log(dataUri);
    dispatch(setPreviewDoc({ imagePrev: dataUri, image: dataUri, file: "" }));
  }

  return (
    <div className="page-selfie">
      <CamTemplate
        webcamRef={webcamRef}
        setImage={handleReduxImage}
        videoConstraints={videoConstraints}
        setVideoConstraits={handleChangeVideoConstraits}
        title="Foto selfie"
        url="/BEN/selfie"
        urlPreview="/BEN/selfie/preview"
        progressCount={1}
        takePhoto={handleTakePhoto}
      >
        <div className="camMask"></div>
        <Camera
          onTakePhoto={handleTakePhoto}
          idealFacingMode={videoConstraints.facingMode}
          isImageMirror={true}
          imageType={IMAGE_TYPES.JPG}
        />
      </CamTemplate>
    </div>
  );
};

export default Selfie;
