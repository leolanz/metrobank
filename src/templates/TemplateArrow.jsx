import React, { memo } from "react";
import "./CamTemplate.scss";
import Footer from "./components/Footer/Footer";
import BackArrow from "../resources/icons/arrow_back.svg"
import { useHistory, useLocation, useParams } from "react-router-dom";
import { ProgressBar } from "../Components";
import ChangeCam from "../resources/icons/changecam.svg";

const TemplateArrow = memo(
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
    progressCount = 1,
    noFooter = false,
    noCam = false,
    noProgress = false,
    takePhoto,
  }) => {
    const history = useHistory();
    const { pathname } = useLocation();
    const params = useParams();

    const capture = React.useCallback(() => {
      if (takePhoto) {
        takePhoto();
        const button = document.getElementById("outer-circle");
        button.click();
      }
      if (webcamRef !== null && webcamRef.current && setImage) {
        const imageSrc = webcamRef.current.getScreenshot();
        console.log("imageSrc", imageSrc);
        setImage({ imagePrev: imageSrc, image: imageSrc, file: "" });
        /* history.push(`${urlPreview}/${params?.id}`); */
      }
      history.push({
        pathname: urlPreview,
        search: history.location.search,
      });
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
        history.push(
          history.push({
            pathname: urlPreview,
            search: history.location.search,
          })
        );
      }
    };

    const handleBack = () => {
      history.go(-2);
    };

    let ClassName = "camera";

    if (noCam) ClassName = "content-camera";

    return (
      <div className="cam-body">
        <div className="back-nav-info" >
          <div className="icon" onClick={handleBack}>
            <img src={BackArrow} alt="backArrow" />
          </div>
          <div className="title">{title}</div>
        </div>

        <div id="webcam" className={ClassName}>
          {children}
        </div>

        {!noFooter && (
          <Footer
            url={url}
            urlPreview={urlPreview}
            nextUrl={nextUrl}
            handleClickCapture={capture}
            handleClickChangeCamera={changeVideoConstraints}
            handleClickUploadFile={uploadFile}
          />
        )}
      </div>
    );
  }
);

export default TemplateArrow;
