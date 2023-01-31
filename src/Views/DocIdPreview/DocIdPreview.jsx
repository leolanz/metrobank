import React, { useEffect } from "react";
import CamTemplate from "../../templates/CamTemplate";
import "./DocIdPreview.scss";
import { useDispatch, useSelector } from "react-redux";
import { setPreviewImage } from "../../redux/features/cam";
import { useHistory } from "react-router-dom";

const SelfiePreview = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (imagePrev === null) history.goBack();
    /*  const element = document.getElementById("webcam");
    element.style.backgroundImage = `url(${imagePrev})`; */
    return () => {
      dispatch(setPreviewImage({ imagePrev: null }));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { imagePrev } = useSelector((store) => store.camera);
  if (imagePrev === null)
    return (
      <div className="page-selfie-preview">
        <CamTemplate
          title="Tómate una foto Selfie"
          url="/BEN/selfie"
          urlPreview="/BEN/selfie/preview"
          nextUrl="/BEN/docID/take-photo"
          progressCount={1}
        ></CamTemplate>
      </div>
    );

  return (
    <div className="page-docID-preview">
      <CamTemplate
        title="Foto de la Cédula"
        url="/BEN/docID"
        urlPreview="/BEN/docID/preview"
        nextUrl="/BEN/info"
        progressCount={2}
      >
        <img /* style={{ width: "auto" }}  */ src={imagePrev} alt="preview" />
      </CamTemplate>
    </div>
  );
};

export default SelfiePreview;
