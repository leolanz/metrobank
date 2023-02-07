import React, { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./DocId.scss";
import { useHistory } from "react-router-dom";
import { setPreviewDoc } from "../../redux/features/cam";
import Camera, { IMAGE_TYPES } from "react-html5-camera-photo";
import Navbar from "../../templates/components/Navbar/Navbar";
import Footer from "../../templates/components/Footer2/Footer";

const DocID = memo(() => {
  const dispatch = useDispatch();
  const NAVBAR_HEIGHT = 82;
  const history = useHistory();
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
      pathname: "/BEN/docID/preview",
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

  return (
    <div className="take-photo-container">
      <Navbar
        title="Foto de la Cédula"
        changeVideoConstraints={handleChangeVideoConstraits}
        progressCount={2}
      />
      <div className="camMask-doc"></div>

      <Camera
        onCameraStart={() => {
          const vids = document.getElementsByTagName("video");
          setvideoHeight(vids[0].offsetHeight);
        }}
        onTakePhoto={onTakePhoto}
        idealFacingMode={videoConstraints}
        isImageMirror={videoConstraints === "user" ? true : false}
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
DocID.displayName = "DocID";
export default DocID;
