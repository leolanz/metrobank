import React, { Fragment, memo, useState } from "react";
import "./Footer.scss";
/* import { CameraAlt, FlipCameraIos, Upload, Cached } from "@mui/icons-material"; */
import { useLocation, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import FileUpload from "../../../resources/icons/file_upload.svg";
import Cam from "../../../resources/icons/cam.svg";
import ChangeCam from "../../../resources/icons/changecam.svg";
import Again from "../../../resources/icons/again.svg";
import { api } from "../../../Connection/Connection";
import { error } from "../../../Hooks/File/useToast";
import Toast from "../../../Components/Toast/toast";
/* import { setTrackInfo } from "../../../redux/features/session"; */
import Loader from "../../../Components/Loader/Loader";
const repitImage = () => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.083252 13.6654V7.83206H5.91658L3.23575 10.5154C3.69365 10.9836 4.24023 11.356 4.84359 11.6106C5.44696 11.8653 6.09501 11.9972 6.74992 11.9987C7.78263 11.9972 8.78954 11.6759 9.6323 11.0791C10.4751 10.4822 11.1123 9.63905 11.4566 8.6654H11.4716C11.5666 8.39456 11.6391 8.1154 11.6874 7.83206H13.3641C13.1611 9.44308 12.3772 10.9246 11.1594 11.9987C9.94158 13.0727 8.37367 13.6653 6.74992 13.6654H6.74158C5.86643 13.668 4.99945 13.497 4.19083 13.1623C3.38221 12.8276 2.64802 12.3358 2.03075 11.7154L0.083252 13.6654ZM1.81159 6.1654H0.134918C0.337815 4.55495 1.12129 3.07386 2.33838 1.9999C3.55548 0.92595 5.12258 0.332928 6.74575 0.332064H6.74992C7.62522 0.329293 8.49237 0.50022 9.30115 0.834944C10.1099 1.16967 10.8442 1.66154 11.4616 2.28206L13.4166 0.332064V6.1654H7.58325L10.2683 3.48206C9.8099 3.01329 9.26264 2.64065 8.65852 2.38596C8.05439 2.13126 7.40554 1.99961 6.74992 1.99873C5.71721 2.00026 4.7103 2.32152 3.86753 2.91838C3.02477 3.51524 2.38749 4.35841 2.04325 5.33206H2.02825C1.93242 5.6029 1.85992 5.88206 1.81242 6.1654H1.81159Z"
        fill="#364156"
      />
    </svg>
  );
};

const Footer = memo(
  ({
    handleClickCapture,
    handleClickUploadFile,
    handleClickChangeCamera,
    url,
    urlPreview,
    nextUrl,
  }) => {
    const { pathname } = useLocation();
    const history = useHistory();
    const params = useParams();
    const { image, file } = useSelector((store) => store.camera);
    /*   const { token, trackInfo } = useSelector((store) => store.session); */
    const [loading, setloading] = useState(false);
    const dispatch = useDispatch();
    const handleFile = (e) => {
      if (handleClickUploadFile) handleClickUploadFile(e.target.files);
    };

    const ActionsButtons = () => {
      return (
        <Fragment>
          {/* <label className="greybutton" htmlFor="fileInput">
            <div className="circle grey">
              <img src={FileUpload} alt="uploadFile" />
            </div>
            <input id="fileInput" type="file" onChange={handleFile} />
          </label> */}

          {pathname.includes("docID") ? (
            <h1>
              ¡Capture una <span>foto de su cédula!</span>
            </h1>
          ) : (
            <h1>
              {" "}
              ¡Capture una <span>Selfie!</span>
            </h1>
          )}

          {pathname.includes("docID") ? (
            <p>
              El documento debe estar centrado en la pantalla y no debe tener
              sombras ni reflejos.
            </p>
          ) : (
            <p>
              Ubíquese en un lugar con buena luz y no use mascarillas, gafas o
              gorras.
            </p>
          )}

          <div className="greybutton big" onClick={handleClickCapture}>
            <div className="circle">
              <svg
                width="21"
                height="18"
                viewBox="0 0 21 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.5 13.2C12.2673 13.2 13.7 11.7673 13.7 10C13.7 8.23269 12.2673 6.8 10.5 6.8C8.73269 6.8 7.3 8.23269 7.3 10C7.3 11.7673 8.73269 13.2 10.5 13.2Z"
                  fill="#26A69A"
                />
                <path
                  d="M7.5 0L5.67 2H2.5C1.4 2 0.5 2.9 0.5 4V16C0.5 17.1 1.4 18 2.5 18H18.5C19.6 18 20.5 17.1 20.5 16V4C20.5 2.9 19.6 2 18.5 2H15.33L13.5 0H7.5ZM10.5 15C7.74 15 5.5 12.76 5.5 10C5.5 7.24 7.74 5 10.5 5C13.26 5 15.5 7.24 15.5 10C15.5 12.76 13.26 15 10.5 15Z"
                  fill="#26A69A"
                />
              </svg>
            </div>
          </div>
          {/* <div className="greybutton" onClick={handleClickChangeCamera}>
            <div className="circle grey">
              <img src={ChangeCam} alt="ChangeCam" />
            </div>
          </div> */}
        </Fragment>
      );
    };

    const sendSelfie = async () => {
      setloading(true);
      var formData = new FormData();
      formData.append("image", image);
      formData.append("file", file);
      formData.append("id_product", params?.id);
      axios({
        method: "post",
        url: `${api.domainServer}/request/selfie`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          /* Authorization: `Bearer ${token}`, */
        },
      })
        .then(function (response) {
          //handle success
          const trackInfo = response.data;
          /* dispatch(setTrackInfo({ trackInfo })); */
          setloading(false);
          if (nextUrl)
            history.push({
              pathname: nextUrl,
              search: history.location.search,
            });
        })
        .catch(function (Error) {
          //handle error
          setloading(false);
          const data = Error.response.data;
          const result = Array.isArray(data);
          if (result) {
            error(data[0].coincidencia);
          } else {
            error(data.message);
          }
        });
    };

    const sendDocID = async () => {
      setloading(true);
      var formData = new FormData();
      formData.append("image", image);
      formData.append("file", file);
      /* formData.append("requestNumber", trackInfo.requestNumber); */
      axios({
        method: "post",
        url: `${api.domainServer}/request/document`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          /*  Authorization: `Bearer ${token}`, */
        },
      })
        .then(function (response) {
          const trackInfo = response.data;
          setloading(false);
          /* dispatch(setTrackInfo({ trackInfo })); */
          history.push({
            pathname: `/confirmation-onboarding/${params?.id}`,
            state: { trackInfo },
            search: history.location.search,
          });
        })
        .catch(function (Error) {
          //handle error
          setloading(false);
          const data = Error.response.data;
          const result = Array.isArray(data);
          if (result) {
            error(data[0].coincidencia);
          } else {
            error(data.message);
          }
        });
    };

    const handleContinue = () => {
      if (pathname.includes("selfie/preview")) sendSelfie();
      if (pathname.includes("docID/preview")) sendDocID();
    };

    const DoneButtons = () => {
      return (
        <Fragment>
          <h1 className={`done ${loading ? "loading" : ""}`}>
            ¡Capture una <span>Exitosa!</span>
          </h1>

          <div className="sendButtons">
            <button
              className="grey"
              /* onClick={() => history.push(`${url}/${params?.id}`)} */
              onClick={() =>
                history.push({ pathname: url, search: history.location.search })
              }
              disabled={loading}
            >
              {repitImage()}
              Repetir foto
            </button>
            <button
              disabled={loading}
              className="blue"
              onClick={handleContinue}
            >
              {loading ? <Loader /> : <div>Siguiente</div>}
            </button>
          </div>
        </Fragment>
      );
    };
    <Toast />;

    return (
      <div
        className={`camera-footer ${
          pathname.includes(urlPreview) ? "background" : ""
        }`}
      >
        {pathname.includes(urlPreview) ? <DoneButtons /> : <ActionsButtons />}
      </div>
    );
  }
);

export default Footer;
