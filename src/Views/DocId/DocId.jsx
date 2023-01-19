import React, { useState, useRef, useEffect } from "react";
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

  const videoRef = useRef(null);
  const photoRef = useRef(null);

  const getVideo = (videoConstraints) => {
    console.log(videoRef);
    if (
      "mediaDevices" in navigator &&
      "getUserMedia" in navigator.mediaDevices
    ) {
      const { facingMode } = videoConstraints;
      navigator.mediaDevices
        .getUserMedia({
          video: {
            width: {
              min: 1280,
              ideal: 1920,
              max: 2560,
            },
            height: {
              min: 720,
              ideal: 1080,
              max: 1440,
            },
            facingMode,
            frameRate: { min: 30, ideal: 60 },
          },
        })
        .then((stream) => {
          let video = videoRef.current;
          if ("srcObject" in video) {
            video.srcObject = stream;
          } else {
            // Avoid using this in new browsers
            video.src = window.URL.createObjectURL(stream);
          }
          video.autofocus = true;
          /*  console.log(video); */
          video.play();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const takePhoto = () => {
    const width = 1440;
    const height = width / (16 / 9);
    let video = videoRef.current;
    let photo = photoRef.current;
    photo.width = width;
    photo.height = height;
    const canvas = document.createElement("canvas");
    const ctxCanvas = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    ctxCanvas.drawImage(video, 0, 0, width, height);
    const imageBase64 = canvas.toDataURL("image/webp", 1);
    dispatch(
      setPreviewDoc({ imagePrev: imageBase64, image: imageBase64, file: "" })
    );
  };

  useEffect(() => {
    getVideo(videoConstraints);
  }, [videoRef, videoConstraints.facingMode, videoConstraints]);

  return (
    <div className="page-docid">
      <CamTemplate
        webcamRef={webcamRef}
        setImage={handleReduxImage}
        videoConstraints={videoConstraints}
        setVideoConstraits={handleChangeVideoConstraits}
        takePhoto={takePhoto}
        title="Foto de la Cédula"
        url="/BEN/docID"
        urlPreview="/BEN/docID/preview"
        progressCount={2}
      >
        <div className="camMask"></div>
        <div className="camera2">
          <video
            autoPlay={true}
            playsInline={true}
            muted={true}
            ref={videoRef}
          ></video>
        </div>

        <div style={{ position: "absolute", zIndex: "-12" }}>
          <canvas ref={photoRef} />
        </div>
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
