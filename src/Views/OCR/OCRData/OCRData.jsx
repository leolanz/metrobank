import React, { useState } from "react";
import "./OCRData.scss";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { api } from "../../../Connection/Connection";
import { error } from "../../../Hooks/File/useToast";
import { useQuery } from "../../../Hooks/useQuery";

const OCRData = (props) => {
  const history = useHistory();
  const userData = history.location.state?.trackInfo?.data;
  const trackInfo = history.location.state?.trackInfo;
  const [loading, setloading] = useState(false);
  const query = useQuery();
  const validateInfo = (type) => {
    let url = `${api.REACT_DOMAIN_BACK}/bnp/ocr?requestNumber=${trackInfo.requestNumber}`;
    if (type === "bad") url += "&validation=0";
    if (type === "good") url += "&validation=1";
    axios({
      method: "get",
      url,
    })
      .then(function (response) {
        const trackInfo = response.data;
        setloading(false);
        let urlPath = "/BEN/activity";
        if (type === "bad") urlPath = "/BEN/docID";
        history.push({
          pathname: urlPath,
          state: { trackInfo },
          search: `${history.location.search}&requestNumber=${trackInfo?.requestNumber}&requestId=${query.requestId}`,
        });
      })
      .catch(function (Error) {
        //handle error
        setloading(false);
        error(Error);

        /*  const data = Error.response.data;
        const result = Array.isArray(data);
        if (result) {
          error(data[0].coincidencia);
        } else {
          error(data.message);
        } */
      });
  };

  return (
    <div className="ocr-wrapper">
      <div className="datos-ocr">
        <div className="titulo">
          <p className="title">Son correctos estos datos Personales?</p>
        </div>
        <div className="ocr-listas">
          <div className="ocr-rows">
            <div className="datos">
              <p className="negrita">ID Documento</p>
              <p className="data">{userData?.idDocument}</p>
            </div>
            <div className="datos">
              <p className="negrita">Expedida</p>
              <p className="data">{userData?.expeditionDate}</p>
            </div>
            <div className="datos">
              <p className="negrita">Expira</p>
              <p className="data">{userData?.expirationDate}</p>
            </div>
            <div className="datos">
              <p className="negrita">Nombres</p>
              <p className="data">{userData?.names}</p>
            </div>
            <div className="datos">
              <p className="negrita">Apellidos</p>
              <p className="data">{userData?.lastNames}</p>
            </div>
            <div className="datos">
              <p className="negrita">F. Nacimiento</p>
              <p className="data">{userData?.birthday}</p>
            </div>
            <div className="datos">
              <p className="negrita">Nacionalidad</p>
              {userData?.nationality.includes("ñ") ? (
                <p
                  className="data upper"
                  dangerouslySetInnerHTML={{
                    __html: `${userData?.nationality.replaceAll(
                      "Ñ",
                      "&ntilde"
                    )}`,
                  }}
                ></p>
              ) : (
                <p className="data">{userData?.nationality} </p>
              )}
            </div>
            <div className="datos">
              <p className="negrita">Lugar de Nac.</p>
              <p className="data">{userData?.placeOfBirth}</p>
            </div>
            <div className="datos">
              <p className="negrita">Sexo</p>
              <p className="data">{userData?.gender}</p>
            </div>
            <div className="titulo">
          <p className="title">Hay algo mal con tus datos? <button className="click" onClick={() => validateInfo("bad")}>Click aquí</button></p>
        </div>
          </div>
        
         
        
        </div>

       
      </div>

      <div className="buttons">
        <button className="green" onClick={() => validateInfo("good")}>
          Sí, son correctos
        </button>
      </div>
    </div>
  );
};
export default OCRData;
