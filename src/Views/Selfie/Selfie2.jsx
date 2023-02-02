import React, { memo, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setPreviewImage } from "../../redux/features/cam";
import { useQuery } from "../../Hooks/useQuery";
import "./selfie.scss";
import { api } from "../../Connection/Connection";
import { useHistory } from "react-router-dom";
import { setPreviewDoc } from "../../redux/features/cam";
import Camera, { IMAGE_TYPES } from "react-html5-camera-photo";
import Navbar from "../../templates/components/Navbar/Navbar";
import Footer from "../../templates/components/Footer2/Footer";

const Selfie2 = memo(() => {
  const dispatch = useDispatch();
  const query = useQuery();
  const NAVBAR_HEIGHT = 82;
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [videoConstraints, setVideoConstraits] = useState("user");
  const [videoHeight, setvideoHeight] = useState(0);
  const handleChangeVideoConstraits = () => {
    videoConstraints === "user"
      ? setVideoConstraits("environment")
      : setVideoConstraits("user");
  };

  const onTakePhoto = React.useCallback((dataUri) => {
    dispatch(setPreviewDoc({ imagePrev: dataUri, image: dataUri, file: "" }));
    const button = document.getElementById("outer-circle");
    button.click();
    history.push({
      pathname: "/BEN/selfie/preview",
      search: history.location.search,
    });
  }, []);

  useEffect(() => {
    const vids = document.getElementsByTagName("video");
    const VIDEO_ELEMENT = vids[0];
    const handleChangesize = () => {
      setvideoHeight(VIDEO_ELEMENT.offsetHeight);
    };
    VIDEO_ELEMENT.addEventListener("loadedmetadata", handleChangesize);
    window.addEventListener("resize", handleChangesize);
    return () => {
      VIDEO_ELEMENT.removeEventListener("loadedmetadata", handleChangesize);
      window.removeEventListener("resize", handleChangesize);
    };
  }, []);

  useEffect(() => {
    const email = query.email;
    const phone = query.phone;
    let url = `${api.REACT_DOMAIN_BACK}/track?`;
    if (email) url += `email=${query.email}&`;
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

  return (
    <div className="take-photo-container">
      <Navbar
        title="Foto selfie"
        changeVideoConstraints={handleChangeVideoConstraits}
        progressCount={1}
      />
      <div
        className="camMask-selfie"
        style={{ height: `calc(100vh - ${videoHeight + NAVBAR_HEIGHT}px)` }}
      ></div>
      <Camera
        onCameraStart={() => {
          const vids = document.getElementsByTagName("video");
          setvideoHeight(vids[0].offsetHeight);
        }}
        onTakePhoto={onTakePhoto}
        idealFacingMode={videoConstraints}
        isImageMirror={videoConstraints === "user" ? true : false}
        /* isImageMirror={false} */
        imageType={IMAGE_TYPES.JPG}
        isMaxResolution={true}
      />
      <Footer
        handleClickCapture={onTakePhoto}
        componentsHeight={videoHeight + NAVBAR_HEIGHT}
      />
    </div>
  );
});
Selfie2.displayName = "Selfie2";
export default Selfie2;
