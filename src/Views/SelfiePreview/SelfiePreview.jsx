import React, { useEffect } from "react";

import CamTemplate from "../../templates/CamTemplate";
import "./selfiePreview.scss";
import { useDispatch, useSelector } from "react-redux";
import { setPreviewImage } from "../../redux/features/cam";

const SelfiePreview = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(setPreviewImage({ imagePrev: null }));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { imagePrev } = useSelector((store) => store.camera);
  if (imagePrev === null) return null;

  return (
    <div className="page-selfie-preview">
      <CamTemplate
        title="Tómate una foto Selfie"
        url="/BEN/selfie/take-photo"
        urlPreview="/BEN/selfie/preview"
        nextUrl="/BEN/docID/take-photo"
        progressCount={1}
      >
        <img src={imagePrev} alt="preview" />
      </CamTemplate>
    </div>
  );
};

export default SelfiePreview;
