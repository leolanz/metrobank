import React, { useState, useEffect } from "react";
import "./UserData.scss";
import { Divider } from "@material-ui/core";
import Nodata from "../../../resources/icons/no-data.svg"
import Close from "../../../resources/icons/close-white.svg"
import Check from "../../../resources/icons/check-white.svg"
import CheckGreen from "../../../resources/icons/check-green.svg"
import { useHistory } from "react-router-dom";
import axios from "axios";
import { api } from "../../../Connection/Connection";
import { error } from "../../../Hooks/File/useToast";
import { useQuery } from "../../../Hooks/useQuery";
import { Modal } from "../../../Components";
import ModalNew from "../../../Components/ModalNew/ModalNew";
import List from "../../../Components/List/List";
import CircularProgress from '@material-ui/core/CircularProgress';
const UserData = (props) => {
  const history = useHistory();

  const [modal, setModal] = React.useState(false);
  const [modalselfie, setModalSelfie] = React.useState(false);
  const [modaldoc, setModalDoc] = React.useState(false);
  const [userData, setUserData] = useState(null);
  const trackInfo = history.location.state?.trackInfo;
  const [loading, setLoading] = useState(false);
  const [fileSelfieData, setFileSelfieData] = useState(null);
  const [list, setList] = useState([]);
  const [fileDocumentData, setFileDocumentData] = useState(null);
  const query = useQuery();
  const resultado = props.resultado;





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
        setLoading(false);
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
        setLoading(false);
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



  //CONSULTA
  useEffect(() => {

    axios({
      method: "post",
      url: `${api.REACT_DOMAIN_BACK}/consult`,
      data: {
        requestNumber: query.requestNumber
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        const data = response.data;

        setLoading(false);
        setUserData(data)
        console.log(data.ocr)

      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  }, []);

  //  LISTAS RESTRICTIVAS

  const Listas = () => {
    axios({
      method: "post",
      url: `${api.REACT_DOMAIN_BACK}/sanction`,
      data: {
        requestNumber: query.requestNumber,
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        const data = response.data;
        setLoading(false);
        setList(data)
        console.log(data)
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  };

  //FOTO SELFIE 
  const FileSelfie = () => {
    axios({
      method: "post",
      url: `${api.REACT_DOMAIN_BACK}/file/selfie`,
      data: {
        requestNumber: query.requestNumber,
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        const data = response.data;
        setLoading(false);
        setFileSelfieData(data);
        console.log(data)
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  };
  // FOTO DOC ID 
  const FileDoc = () => {
    axios({
      method: "post",
      url: `${api.REACT_DOMAIN_BACK}/file/document`,
      data: {
        requestNumber: query.requestNumber,
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        const data = response.data;
        setLoading(false);
        setFileDocumentData(data);
        console.log(data)
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  };




  const handleListModal = async () => {
    await Listas();
    setModal(true);
  };
  const handleFileSelfieModal = async () => {
    await FileSelfie();
    setModalSelfie(true);
  };

  const handleFileDocumentModal = async () => {
    await FileDoc();
    setModalDoc(true);
  };

  return (
    <div className="user-info-container surface" >


      <ModalNew
        show={modal}
        title="Listas restrictivas"
        close={() => {
          setModal(false);
        }}
      >


        {list.length > 0 ? (
          list.map((item) => (
            <List>
              <div key={item.id}>
                <div className="listas-listas">
                  <div className="title-listas">
                    <p className="titles">Nombre</p>
                    <p className="titles">Puntos</p>
                    <p className="titles">Lista de Sanciones</p>
                    <p className="titles">Prospecto</p>
                    <p className="titles">ID</p>
                  </div>
                  <div className="text-listas">
                    <p className="text">{item.prospect}</p>
                    <p className="text">{item.points}</p>
                    <p className="text">{item.sanctionsList}</p>
                    <p className="text">{item.coincidence}</p>
                    <p className="text">{item.id}</p>
                  </div>
                </div>
              </div>
            </List>
          ))
        ) : (
          <div>{loading ? <CircularProgress /> :
            <div className="no-data">
              <img src={Nodata} alt="nodata" className="icon-nodata" />
              <p className="text-no-data">No se encontraron coincidencias en ninguna lista.</p></div>}
          </div>

        )}


      </ModalNew>
      <ModalNew
        show={modalselfie}
        title="Foto selfie"
        close={() => {
          setModalSelfie(false);
        }}
      >

        {fileSelfieData && fileSelfieData ? (
          <div className="image-selfie">
            <img className="selfie" src={`data:image/jpeg;base64, ${fileSelfieData.file}`} alt="Selfie" />

          </div>
        ) : (
          <>


            <div className="cargando-info">
              <CircularProgress className="spinner" />
              Cargando...
            </div>
          </>

        )}


      </ModalNew>
      <ModalNew
        show={modaldoc}
        title="Foto Documento ID"
        close={() => {
          setModalDoc(false);
        }}
      >

        {fileDocumentData &&  fileDocumentData ?(
          <div className="image-selfie">
            <img className="doc" src={`data:image/jpeg;base64, ${fileDocumentData.file}`} alt="Documento" />

          </div>
        ) : (
          <>


            <div className="cargando-info">
              <CircularProgress className="spinner" />
              Cargando...
            </div>
          </>

        )}


      </ModalNew>
      {userData && userData.ocr ? (
        <div className="info-rows">
          <div>

            <div className="results">Resultado de OCR</div>

            {userData && userData.ocr && (
              <div className="table">
                <div >
                  <p className="titles">ID Documento</p>
                  <p className="titles">Expedida</p>
                  <p className="titles">Expira</p>
                  <p className="titles">Nombres</p>
                  <p className="titles">Apellidos</p>
                  <p className="titles">F. Nacimiento</p>
                  <p className="titles">Nacionalidad</p>
                  <p className="titles">País de Nac.</p>
                  <p className="titles">Sexo</p>
                </div>
                <div className="text">
                  <p className="data">{userData.ocr.idDocument}</p>

                  <p className="data">
                    {userData.ocr.expeditionDate}
                  </p>

                  <p className="data">{userData.ocr.expirationDate}</p>

                  <p className="data">{userData.ocr.names}</p>

                  <p className="data">{userData.ocr.lastNames}</p>
                  <p className="data">{userData.ocr.birthday}</p>
                  {userData.ocr.nationality.includes("ñ") ? (
                    <p
                      className="data upper"
                      dangerouslySetInnerHTML={{
                        __html: `${userData.ocr.nationality.replaceAll("Ñ", "&ntilde")}`,
                      }}
                    ></p>
                  ) : (
                    <p className="data">{userData.ocr.nationality}</p>
                  )}
                  <p className="data">{userData.ocr.placeOfBirth}</p>
                  <p className="data">{userData.ocr.gender}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="cargando-info">
            <CircularProgress className="spinner" />
            Cargando...
          </div>
        </>
      )}
      {userData && userData.user && (
        <div className="info-rows">
          <div >

            <div className="results">Usuario</div>

            {userData && userData.user && (
              <div className="table">
                <div >
                  <p className="titles">Actividad</p>
                  <p className="titles">Relación PEP</p>
                  <p className="titles">Listas restrictivas</p>
                  <p className="titles">Foto selfie</p>
                  <p className="titles">Foto Doc ID</p>

                </div>
                <div className="text">

                  <p className="data">
                    {userData.user.activity ? userData.user.activity : 'No posee actividad'}
                  </p>
                  <p className="data">
                    {userData.user.pep ? userData.user.pep : 'No posee PEP'}
                  </p>

                  <p ><button className="more" onClick={handleListModal}>En {userData.user.listSanction} listas</button></p>
                  <p > <button className="more" onClick={handleFileSelfieModal}>Ver más</button></p>
                  <p ><button className="more" onClick={handleFileDocumentModal}>Ver más</button></p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {userData && userData.response && (
        <div className="info-rows">
          <div >

            <div className="results">Respuesta</div>

            {userData && userData.response && (
              <div className="table">
                <div >
                  <p className="titles">Fecha y hora</p>
                  <p className="titles">Resultado</p>
                </div>
                <div className="text">
                  <p className="data">{userData.response.dateTime}</p>
                  <p className={`data ${userData.response.result ? 'aprobado' : 'revision'}`}>
                    {userData.response.result ? (
                      <>
                        <img src={Check} className="check" />
                        Aprobado
                      </>
                    ) : (
                      <>
                        <img src={Close} className="close" />
                        Revisión de cumplimiento
                      </>
                    )}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {userData && userData.response && (
        <div className="info-rows">
          <div >
            <div className="results">Respuesta</div>

            <div className="table">
              <div >
                <p className="titles">OCR</p>
                <p className="titles">Comparación Biométrica</p>
              </div>
              <div className="text">
                <p className="data">Satisfactorio   <img src={CheckGreen} className="check-green" />
                </p>
                <p className="data"> Satisfactorio  <img src={CheckGreen} className="check-green" /></p>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
export default UserData;
