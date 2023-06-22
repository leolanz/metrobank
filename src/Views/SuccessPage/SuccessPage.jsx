import React, { useEffect, useState } from "react";
import CamTemplate from "../../templates/CamTemplate";
import Success from "../../Assets/success.svg";
import Person from "../../Assets/Person.svg";
import { Button } from "../../Components";
import { useHistory } from "react-router-dom";
import { api } from "../../Connection/Connection";
import axios from "axios";
import { useQuery } from "../../Hooks/useQuery";
import { error } from "../../Hooks/File/useToast";
import "./SuccessPage.scss";
import CircularProgress from '@material-ui/core/CircularProgress';
const initialRef = null;

const SuccessPage = () => {
  const webcamRef = React.useRef(initialRef);
  const history = useHistory();
  const { trackInfo, email } = history?.location?.state || {}; // Get trackInfo and email from location.state
  const [redirectUrl, setredirectUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const query = useQuery();
  const [userData, setUserData] = useState(null);
  const sessionImage = sessionStorage.getItem("img-preview");

  useEffect(() => {
    axios({
      method: "post",
      url: `${api.REACT_DOMAIN_BACK}/consult`,
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
        setUserData(data);
        console.log(data.ocr);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="page-SuccessPage">
      <CamTemplate
        webcamRef={webcamRef}
        title="¡Registro completado!"
        url="/BEN/selfie/take-photo"
        urlPreview="/BEN/selfie/preview"
        noFooter
        noCam
        noProgress
      >
        <div className="body-success">
          {userData && userData.ocr ? (
            <>
              <div className="completed">
                <img src={Person} alt="person" />
                <h3>
                  ¡{userData?.ocr?.names}, hemos validado su identidad correctamente!
                </h3>
                <p>
                  Recibirá un mensaje de texto en su celular con un código de verificación y podrá configurar su PIN y foto de Perfil.
                </p>
              </div>

              <div>     <Button
                ben
                full
                className="button-private"
                color="private"
                onClick={() => {
                  history.push("/BEN/info");
                }}
              >
                Ver respuesta privada
              </Button>
              <Button
                ben
                full
                color="primary"
                onClick={() => window.location.replace(redirectUrl)}
                disabled
              >
                Siguiente
              </Button></div>
         
            </>
          ) : (
            <>

            
              <div className="circulo">
              <CircularProgress className="spinner"/>
                Cargando...
              </div>
            </>
          )}
        </div>
      </CamTemplate>
    </div>
  );
};

export default SuccessPage;
