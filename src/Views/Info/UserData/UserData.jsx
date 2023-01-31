import React, { useState } from "react";
import "./UserData.scss";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { api } from "../../../Connection/Connection";
import { error } from "../../../Hooks/File/useToast";

const UserData = (props) => {
  const history = useHistory();
  const userData = history.location.state?.trackInfo?.data;
  const trackInfo = history.location.state?.trackInfo;
  const [loading, setloading] = useState(false);

  const validateInfo = (type) => {
    let url = `${api.REACT_DOMAIN_BACK}/ocr?requestNumber=${trackInfo.requestNumber}`;
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
          search: `${history.location.search}&requestNumber=${trackInfo?.requestNumber}`,
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

  return (
    <div className="user-info-container surface">
      <div className="data">
        <h3 className="titleInfo">
          Confirme que todos{" "}
          <span className="text-bold ben-color"> los datos sean correctos</span>
        </h3>

        <div className="info-rows">
          <div className="info-col">
            <div className="label">
              <p>ID Documento</p>
              <p className="data">{userData?.idDocument}</p>
            </div>
            <div className="label">
              <p>Expedida</p>
              <p className="data">{userData?.expeditionDate}</p>
            </div>
            <div className="label">
              <p>Expira</p>
              <p className="data">{userData?.expirationDate}</p>
            </div>
            <div className="label">
              <p>Nombres</p>
              <p className="data">{userData?.names}</p>
            </div>
            <div className="label">
              <p>Apellidos</p>
              <p className="data">{userData?.lastNames}</p>
            </div>
          </div>
          <div className="info-col">
            <div className="label">
              <p>F. Nacimiento</p>
              <p className="data">{userData?.birthday}</p>
            </div>
            <div className="label">
              <p>Nacionalidad</p>
              <p className="data">{userData?.nationality}</p>
            </div>
            <div className="label">
              <p>Lugar de Nac.</p>
              <p className="data">{userData?.placeOfBirth}</p>
            </div>
            <div className="label">
              <p>Sexo</p>
              <p className="data">{userData?.gender}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="buttons">
        <button onClick={() => validateInfo("bad")}>Algo anda mal</button>
        <button className="green" onClick={() => validateInfo("good")}>
          Confirmar
        </button>
      </div>
    </div>
  );
};
export default UserData;
