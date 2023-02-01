import React, { useEffect, useState } from "react";
import Navbar from "../../templates/components/Navbar/Navbar";
import CamTemplate from "../../templates/CamTemplate";
import "./DocIdPreview.scss";
import { useDispatch, useSelector } from "react-redux";
import { setPreviewImage } from "../../redux/features/cam";
import { useHistory } from "react-router-dom";
import Footer from "../../templates/components/Footer2/Footer";
import axios from "axios";
import { useQuery } from "../../Hooks/useQuery";
import { api } from "../../Connection/Connection";
import { error } from "../../Hooks/File/useToast";

const SelfiePreview = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [imageHeight, setimageHeight] = useState(200);

  const { imagePrev } = useSelector((store) => store.camera);
  const NAVBAR_HEIGHT = 82;

  const query = useQuery();
  const { image } = useSelector((store) => store.camera);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const IMAGE = document.getElementById("image-preview-container");
    const handleChangesize = () => {
      setimageHeight(IMAGE.offsetHeight);
    };
    if (imagePrev !== null) handleChangesize();
    if (imagePrev !== null) {
      window.addEventListener("resize", handleChangesize);
    }
    return () => {
      window.removeEventListener("resize", handleChangesize);
    };
  }, [imagePrev]);

  useEffect(() => {
    if (imagePrev === null) history.goBack();
    return () => {
      dispatch(setPreviewImage({ imagePrev: null }));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendDocID = async () => {
    setloading(true);
    var formData = new FormData();
    console.log("file", image);
    formData.append("image", image);
    formData.append("email", query.email);
    formData.append("phone", query.phone);
    formData.append("requestNumber", query.requestNumber);

    axios({
      method: "post",
      url: `${api.REACT_DOMAIN_BACK}/document`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        /* Authorization: `Bearer ${token}`, */
      },
    })
      .then(function (response) {
        const trackInfo = response.data;
        setloading(false);
        /* dispatch(setTrackInfo({ trackInfo })); */
        history.push({
          pathname: "/BEN/info",
          state: { trackInfo },
          /* search: `${history.location.search}&requestNumber=${trackInfo.requestNumber}&email=${query.email}&phone=${query.phone}`, */
          search: `?requestNumber=${trackInfo.requestNumber}&email=${query.email}&phone=${query.phone}`,
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
        history.push({
          pathname: "/BEN/docID",
          state: {},
          /*  search: `${history.location.search}&requestNumber=${query.requestNumber}&email=${query.email}&phone=${query.phone}`, */
          search: `?requestNumber=${query.requestNumber}&email=${query.email}&phone=${query.phone}`,
        });
      });
  };

  if (imagePrev === null)
    return (
      <div className="show-photo-container">
        <CamTemplate
          title="Foto selfie"
          url="/BEN/selfie"
          urlPreview="/BEN/selfie/preview"
          nextUrl="/BEN/docID"
          progressCount={2}
        ></CamTemplate>
      </div>
    );

  return (
    <div className="show-photo-container">
      <Navbar title="Foto de la Cédula" progressCount={2} />
      <div id="image-preview-container">
        <img id="image" src={imagePrev} alt="preview" />
      </div>
      <Footer
        url="/BEN/docID"
        loadingUploadPhoto={loading}
        handleSendPhoto={sendDocID}
        componentsHeight={imageHeight + NAVBAR_HEIGHT}
      />
    </div>
  );
};

export default SelfiePreview;
