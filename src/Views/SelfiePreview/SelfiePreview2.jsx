import React, { useEffect, useState } from "react";
import Navbar from "../../templates/components/Navbar/Navbar";
import CamTemplate from "../../templates/CamTemplate";
import "./selfiePreview.scss";
import { useDispatch, useSelector } from "react-redux";
import { setPreviewImage } from "../../redux/features/cam";
import { useHistory, useLocation } from "react-router-dom";
import Footer from "../../templates/components/Footer2/Footer";
import axios from "axios";
import { useQuery } from "../../Hooks/useQuery";
import { api } from "../../Connection/Connection";
import { error } from "../../Hooks/File/useToast";
import Toast from "../../Components/Toast/toast";
import Loader from "../../Components/Loader/Loader";

const SelfiePreview = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [imageHeight, setimageHeight] = useState(200);

  const { imagePrev } = useSelector((store) => store.camera);
  const NAVBAR_HEIGHT = 82;

  const { pathname } = useLocation();
  const query = useQuery();
  const { image, file } = useSelector((store) => store.camera);
  const [loading, setloading] = useState(false);

  /*  useEffect(() => {
    const IMAGE = document.getElementById("image");
    const handleChangesize = () => {
      setimageHeight(IMAGE.offsetHeight);
    };
    if (imagePrev !== null) {
      window.addEventListener("resize", handleChangesize);
    }
    return () => {
      window.removeEventListener("resize", handleChangesize);
    };
  }, [imagePrev]); */

  useEffect(() => {
    if (imagePrev === null) history.goBack();
    return () => {
      dispatch(setPreviewImage({ imagePrev: null }));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendSelfie = async () => {
    setloading(true);
    var formData = new FormData();
    formData.append("image", image);
    formData.append("email", query.email);
    formData.append("phone", query.phone);
    axios({
      method: "post",
      url: `${api.REACT_DOMAIN_BACK}/selfie`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(function (response) {
        //handle success
        const trackInfo = response.data;
        setloading(false);
        history.push({
          pathname: "/BEN/docID",
          state: { trackInfo },
          search: `?requestNumber=${trackInfo.requestNumber}&email=${query.email}&phone=${query.phone}`,
        });
      })
      .catch(function (Error) {
        //handle error
        setloading(false);
        const data = Error.response.data;
        const result = Array.isArray(data);
        if (result) {
          console.log("hizo esta");
          error(data[0].coincidencia);
        } else {
          error(data.message);
        }
        history.push({
          pathname: "/BEN/selfie",
          state: {},
          search: `?email=${query.email}&phone=${query.phone}`,
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
          progressCount={1}
        ></CamTemplate>
      </div>
    );

  return (
    <div className="show-photo-container">
      <Navbar title="Foto selfie" progressCount={1} />
      <img
        id="image"
        onLoadedData={(e) => console.log(e)}
        src={imagePrev}
        alt="preview"
      />
      <Footer
        url="/BEN/selfie"
        loadingUploadPhoto={loading}
        handleSendPhoto={sendSelfie}
        componentsHeight={imageHeight + NAVBAR_HEIGHT}
      />
    </div>
  );
};

export default SelfiePreview;
