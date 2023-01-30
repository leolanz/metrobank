import React, { useState, useRef, useEffect } from "react";
import CamTemplate from "../../templates/CamTemplate";
import Webcam from "react-webcam";
import "./DocId.scss";
import { useDispatch } from "react-redux";
import { setPreviewDoc } from "../../redux/features/cam";
import Camera, { IMAGE_TYPES } from "react-html5-camera-photo";

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

  const videoRef = useRef(null);
  const photoRef = useRef(null);

  const getVideo = (videoConstraints) => {
    const { facingMode } = videoConstraints;
    const CONSTRAINTS = {
      audio: false,
      video: {
        width: {
          min: 320,
        },
        height: {
          min: 180,
        },

        /* width: {
      min: 1280,
      ideal: 1920,
      max: 2560,
    },
    height: {
      min: 720,
      ideal: 1080,
      max: 1440,
    }, */
        /* width: { min: 320, ideal: 640, max: 1280 },
        height: { min: 180, ideal: 360, max: 720 }, */
        facingMode,
        frameRate: { min: 30 },
      },
    };
    if (
      "mediaDevices" in navigator &&
      "getUserMedia" in navigator.mediaDevices
    ) {
      navigator.mediaDevices
        .getUserMedia(CONSTRAINTS)
        .then((stream) => {
          let video = videoRef.current;
          if ("srcObject" in video) {
            video.srcObject = stream;
          } else {
            // Avoid using this in new browsers
            video.src = window.URL.createObjectURL(stream);
          }
          /*  video.autofocus = true; */
          video.setAttribute("autoplay", "");
          video.setAttribute("muted", "");
          video.setAttribute("playsinline", "");
          /*  console.log(video); */
          video.play();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const takePhoto = () => {
    let video = videoRef.current;
    let photo = photoRef.current;
    const width = video.videoWidth;
    const height = video.videoHeight;
    /* const width = 1024;
    const height = 1024;
     const height = width / (16 / 9); */
    photo.width = width;
    photo.height = height;
    const canvas = document.createElement("canvas");
    const ctxCanvas = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    ctxCanvas.drawImage(video, 0, 0, width, height);
    const imageBase64 = canvas.toDataURL("image/png", 1);
    /* navigator.clipboard.writeText(imageBase64); */
    dispatch(
      setPreviewDoc({ imagePrev: imageBase64, image: imageBase64, file: "" })
    );
  };

  useEffect(() => {
    getVideo(videoConstraints);
  }, [videoRef, videoConstraints.facingMode, videoConstraints]);

  function handleTakePhoto(dataUri) {
    console.log(dataUri);
    dispatch(setPreviewDoc({ imagePrev: dataUri, image: dataUri, file: "" }));
  }

  return (
    <div className="page-docid">
      <CamTemplate
        webcamRef={webcamRef}
        setImage={handleReduxImage}
        videoConstraints={videoConstraints}
        setVideoConstraits={handleChangeVideoConstraits}
        takePhoto={handleTakePhoto}
        title="Foto de la Cédula"
        url="/BEN/docID"
        urlPreview="/BEN/docID/preview"
        progressCount={2}
      >
        <Camera
          onTakePhoto={handleTakePhoto}
          idealFacingMode={videoConstraints.facingMode}
          isImageMirror={false}
          imageType={IMAGE_TYPES.JPG}
        />
        <div className="camMask version react html5"></div>
        {/* <div id="camera-v2.3" className="video-container">
          <video ref={videoRef}></video>
        </div>

        <div style={{ position: "absolute", zIndex: "-12" }}>
          <canvas ref={photoRef} />
        </div> */}
      </CamTemplate>
    </div>
  );
};

export default DocID;

{
  /* <Webcam
          onError={(e) => console.log("on error", e)}
          onUserMediaError={(e) => console.log("on user media error", e)}
          audio={false}
          forceScreenshotSourceSize={false}
          ref={webcamRef}
          imageSmoothing={false}
          screenshotFormat="image/png"
          screenshotQuality={1}
          videoConstraints={videoConstraints}
        /> */
}
