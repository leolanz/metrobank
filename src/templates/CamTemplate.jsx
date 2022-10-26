import React, { memo } from "react";
import "./CamTemplate.scss";
import Footer from "./components/Footer/Footer";
import BackArrow from "../resources/icons/whiteBack.svg";
import { useHistory, useLocation, useParams } from "react-router-dom";

const CamTemplate = memo(
  ({
    children,
    title,
    url,
    urlPreview,
    webcamRef,
    videoConstraints,
    setVideoConstraits,
    setImage,
    nextUrl,
  }) => {
    const history = useHistory();
    const { pathname } = useLocation();
    const params = useParams();
    const capture = React.useCallback(() => {
      if (webcamRef !== null && webcamRef.current && setImage) {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage({ imagePrev: imageSrc, image: imageSrc, file: "" });
        history.push(`${urlPreview}/${params?.id}`);
      }
    }, [webcamRef]);

    const changeVideoConstraints = () => {
      if (!setVideoConstraits) return;
      if (videoConstraints.facingMode === "environment") {
        return setVideoConstraits({
          facingMode: "user",
        });
      }
      setVideoConstraits({
        facingMode: "environment",
      });
    };

    const uploadFile = (files) => {
      if (files.length > 0 && setImage) {
        setImage({
          imagePrev: URL.createObjectURL(files[0]),
          image: "",
          file: files[0],
        });
        history.push(`${urlPreview}/${params?.id}`);
      }
    };

    const handleBack = () => {
      /*  if (pathname.includes(urlPreview)) return history.push(`${url}/${params?.id}`);
      if (pathname.includes(url)) return history.goBack();
      return history.push(`/selfie/${params?.id}`); */
      history.goBack();
    };

    return (
      <div className="cam-body">
        <div className="back-nav">
          <div className="icon" onClick={handleBack}>
            <img src={BackArrow} alt="backArrow" />
          </div>
          {title}
        </div>
        <div id="webcam" className="camera">
          {children}
        </div>
        <Footer
          url={url}
          urlPreview={urlPreview}
          nextUrl={nextUrl}
          handleClickCapture={capture}
          handleClickChangeCamera={changeVideoConstraints}
          handleClickUploadFile={uploadFile}
        />
      </div>
    );
  }
);

export default CamTemplate;
