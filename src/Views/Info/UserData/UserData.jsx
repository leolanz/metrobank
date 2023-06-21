import React, { useState } from "react";
import "./UserData.scss";
import { Divider } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { api } from "../../../Connection/Connection";
import { error } from "../../../Hooks/File/useToast";
import { useQuery } from "../../../Hooks/useQuery";
import { Modal } from "../../../Components";
import ModalNew from "../../../Components/ModalNew/ModalNew";
import List from "../../../Components/List/List";
const UserData = (props) => {
  const history = useHistory();
  const userData = history.location.state?.trackInfo?.data;
  const trackInfo = history.location.state?.trackInfo;
  const [modal, setModal] = React.useState(false);
  const [loading, setloading] = useState(false);
  const query = useQuery();
  const resultado = props.resultado;

  const getBackgroundColor = () => {
    if (resultado === "Aprobado") {
      return "green";
    } else if (resultado === "Revisión de cumplimiento") {
      return "red";
    } else {
      return "transparent";
    }
  };

  const getIcon = () => {
    if (resultado === "Aprobado") {
      return <i className="fas fa-check"></i>;
    } else if (resultado === "Revisión de cumplimiento") {
      return <i className="fas fa-close"></i>;
    } else {
      return null;
    }
  };

  const getText = () => {
    if (resultado === "Aprobado") {
      return "Aprobado";
    } else if (resultado === "Revisión de cumplimiento") {
      return "Revisión de cumplimiento";
    } else {
      return "Resultado desconocido";
    }
  };

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

  const listaItems = [
    { label: "Nombre", value: "Leonidas Nicolas, Centeno Rivera" },
    { label: "Puntos", value: "100" },
    { label: "Listas de Sanciones", value: "Canada" },
    { label: "Prospecto", value: "Nicolas" },
    { label: "ID", value: "1831.0" },

  ];
  return (
    <div className="user-info-container surface" >
      <ModalNew
        show={modal}
        title="Listas"
        close={() => {
          setModal(false);
        }}
      >
        
        <List>
        {listaItems.map((item, index) => (
          <div key={index} className="div-listas">
         
              <div className="title">{item.label}</div>
              <div className="text">{item.value}</div>
            </div>

        ))}
        </List>

      </ModalNew>
      <div className="info-rows">
        <div className="result">Resultado de OCR</div>

        <div className="info-col">
          <div className="label">
            <p>ID Documento</p>
            <p className="data">{userData?.idDocument}</p>
          </div>
          <div className="label">
            <p>Expedida</p>
            <p className="data">
              {userData?.expeditionDate}
            </p>
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
            {userData?.nationality.includes("ñ") ? (
              <p
                className="data upper"
                dangerouslySetInnerHTML={{
                  __html: `${userData?.nationality.replaceAll("Ñ", "&ntilde")}`,
                }}
              ></p>
            ) : (
              <p className="data">{userData?.nationality}</p>
            )}
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
      <div className="info-rows">
        <div className="result">Usuario</div>

        <div className="info-col">
          <div className="label">
            <p>Actividad</p>
            <p className="data">{userData?.activity}</p>
          </div>
          <div className="label">
            <p>Relación PEP</p>
            <p className="data">{userData?.pep}</p>
          </div>
          <div className="label">
            <p>Listas restrictivas</p>
            <p className="data">

              <button
                className="button-result"
                onClick={() => {
                  setModal(true);
                }}
              >
                En {userData?.listSanction} listas
              </button>
            </p>
          </div>
          <div className="label">
            <p>Foto selfie</p>
            <p className="data">
              {userData?.names}
              <button className="button-result">Ver más</button>
            </p>
          </div>
          <div className="label">
            <p>Foto Doc ID</p>
            <p className="data">
              {userData?.lastNames}
              <button className="button-result">Ver más</button>
            </p>
          </div>
        </div>
      </div>
      <div className="info-rows">
        <div className="result">Respuesta</div>

        <div className="info-col">
          <div className="label">
            <p>Fecha y hora</p>
            <p className="data">{userData?.dateTime}</p>
          </div>
          <div className="label" >
            <p>Resultado:</p>
            <p className="data" style={{ backgroundColor: getBackgroundColor() }}>{userData?.result}      {getText()} {getIcon()}</p>
          </div>
        </div>
      </div>
      <div className="info-rows">
        <div className="result">Apis</div>

        <div className="info-col">
          <div className="label">
            <p>OCR</p>
            <p className="data">{userData?.idDocument}Satisfactorio</p>
          </div>
          <div className="label">
            <p>Comparación Biométrica</p>
            <p className="data">{userData?.expeditionDate}Satisfactorio</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserData;
