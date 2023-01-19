import React, { useEffect } from "react";

import CamTemplate from "../../templates/CamTemplate";
import "./selfiePreview.scss";
import { useDispatch, useSelector } from "react-redux";
import { setPreviewImage } from "../../redux/features/cam";
import { useHistory } from "react-router-dom";

const SelfiePreview = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (imagePrev === null) history.goBack();
    const element = document.getElementById("webcam");
    element.style.backgroundImage = `url(${imagePrev})`;
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
          title="Foto selfie"
          url="/BEN/selfie"
          urlPreview="/BEN/selfie/preview"
          nextUrl="/BEN/docID"
          progressCount={1}
        ></CamTemplate>
      </div>
    );

  return (
    <div className="page-selfie-preview">
      <CamTemplate
        title="Foto selfie"
        url="/BEN/selfie"
        urlPreview="/BEN/selfie/preview"
        nextUrl="/BEN/docID"
        progressCount={1}
      >
        {/*  <img src={imagePrev} alt="preview" /> */}
      </CamTemplate>
    </div>
  );
};

export default SelfiePreview;
