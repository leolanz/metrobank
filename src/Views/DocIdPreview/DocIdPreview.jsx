import React, { useEffect } from "react";
import CamTemplate from "../../templates/CamTemplate";
import "./DocIdPreview.scss";
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
    <div className="page-docID-preview">
      <CamTemplate
        title="Escanea tu documento ID"
        url="/docID"
        urlPreview="/docID-preview"
        nextUrl="/confirmation-onboarding"
      >
        <img src={imagePrev} alt="preview" />
      </CamTemplate>
    </div>
  );
};

export default SelfiePreview;
