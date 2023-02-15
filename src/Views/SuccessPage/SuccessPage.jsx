import React, { useEffect, useState } from "react";
import CamTemplate from "../../templates/CamTemplate";
import BlueCheck from "../../Assets/BlueCheck.svg";
import Person from "../../Assets/Person.svg";
import { Button } from "../../Components";
import { useHistory } from "react-router-dom";
import { api } from "../../Connection/Connection";
import axios from "axios";

import "./SuccessPage.scss";

const initialRef = null;

const SuccessPage = () => {
  const webcamRef = React.useRef(initialRef);
  const history = useHistory();
  const RESPONSE = history?.location?.state?.trackInfo?.data;
  const [redirectUrl, setredirectUrl] = useState("");

  const sendRequestMPAy = () => {
    console.log("RESPONSE.body", RESPONSE.body);
    axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-Api-key": "a30a003d-0ec5-45c3-a585-d05507a90eef",
      },
      url: `${api.mpay}`,
      body: JSON.stringify(RESPONSE.body),
    })
      .then(function (response) {
        setredirectUrl(response.data.url);
      })
      .catch(function (Error) {
        console.log(Error);
      });
  };

  useEffect(() => {
    if (RESPONSE?.resolution === "APPROVAL") {
      sendRequestMPAy();
    }
  }, [RESPONSE]);

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
          {RESPONSE?.resolution === "APPROVAL" ? (
            <>
              <div className="completed">
                <img src={Person} alt="person" />
                <h3>
                  ¡{RESPONSE?.name}, hemos validado su identidad correctamente!
                </h3>
                <p>
                  Recibirá un mensaje de texto en su celular con un{" "}
                  <strong>código de verificación</strong> y podrá configurar su
                  PIN y foto de Perfil.
                </p>
              </div>
              <Button
                ben
                full
                /* disabled={data === "" || value === ""} */
                color="primary"
                onClick={() => window.location.replace(redirectUrl)}
              >
                Siguiente
              </Button>
            </>
          ) : (
            <>
              <div className="succeed">
                <img src={BlueCheck} alt="BlueCheck" />
                <h3>¡{RESPONSE?.name}, hemos recibido su solicitud!</h3>
                <p>
                  Nuestra Área de Atención al cliente estará evaluando su
                  solicitud y próximamente será contactado.
                </p>
              </div>
              <Button
                ben
                full
                /* disabled={data === "" || value === ""} */
                color="primary"
                onClick={() => {
                  window.history.go(-1); // regresa a la pagina anterior
                }}
              >
                Ok, entendido
              </Button>
            </>
          )}
        </div>
      </CamTemplate>
    </div>
  );
};

export default SuccessPage;
