import React, { memo } from "react";
import "./CamTemplate.scss";
import Footer from "./components/Footer/Footer";
import BackArrow from "../resources/icons/whiteBack.svg";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { ProgressBar } from "../Components";

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
    progressCount = 1,
    noFooter = false,
    noCam = false,
  }) => {
    const history = useHistory();
    const { pathname } = useLocation();
    const params = useParams();
    const capture = React.useCallback(() => {
      if (webcamRef !== null && webcamRef.current && setImage) {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage({ imagePrev: imageSrc, image: imageSrc, file: "" });
        /* history.push(`${urlPreview}/${params?.id}`); */
        history.push({
          pathname: urlPreview,
          search: history.location.search,
        });
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
        history.push(
          history.push({
            pathname: urlPreview,
            search: history.location.search,
          })
        );
      }
    };

    const handleBack = () => {
      /*  if (pathname.includes(urlPreview)) return history.push(`${url}/${params?.id}`);
      if (pathname.includes(url)) return history.goBack();
      return history.push(`/selfie/${params?.id}`); */
      history.goBack();
    };
    let ClassName = "camera";
    if (noCam) ClassName = "content-camera";
    return (
      <div className="cam-body">
        <div className="back-nav">
          <div className="icon" onClick={handleBack}>
            <img src={BackArrow} alt="backArrow" />
          </div>
          <div className="title">{title}</div>
          <div className={`numbers-container`}>
            <ProgressBar items={3} cont={progressCount} />
          </div>
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

export default CamTemplate;
