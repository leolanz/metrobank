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
          <label className="greybutton" htmlFor="fileInput">
            <div className="circle grey">
              <img src={FileUpload} alt="uploadFile" />
            </div>
            <input id="fileInput" type="file" onChange={handleFile} />
          </label>
          <div className="greybutton big" onClick={handleClickCapture}>
            <div className="circle">
              <img src={Cam} alt="cam" />
            </div>
          </div>
          <div className="greybutton" onClick={handleClickChangeCamera}>
            <div className="circle grey">
              <img src={ChangeCam} alt="ChangeCam" />
            </div>
          </div>
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
          if (nextUrl) history.push(`${nextUrl}/${params?.id}`);
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
      if (pathname.includes("selfie-preview")) sendSelfie();
      if (pathname.includes("docID-preview")) sendDocID();
    };

    const DoneButtons = () => {
      return (
        <div className="sendButtons">
          <button
            className="grey"
            onClick={() => history.push(`${url}/${params?.id}`)}
          >
            Reintentar <img src={Again} alt="Again" />
          </button>
          <button disabled={loading} className="green" onClick={handleContinue}>
            {loading ? "Cargando foto..." : "Continuar"}
          </button>
        </div>
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
