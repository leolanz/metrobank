import React from "react";
import CamTemplate from "../../templates/CamTemplate";
import BlueCheck from "../../Assets/BlueCheck.svg";
import Person from "../../Assets/Person.svg";
import { Button } from "../../Components";
import { useHistory } from "react-router-dom";
import "./SuccessPage.scss";

const initialRef = null;

const SuccessPage = () => {
  const webcamRef = React.useRef(initialRef);
  const history = useHistory();
  const RESPONSE = history?.location?.state?.trackInfo?.data;

  return (
    <div className="page-SuccessPage">
      <CamTemplate
        webcamRef={webcamRef}
        title="!Registro completado!"
        url="/BEN/selfie/take-photo"
        urlPreview="/BEN/selfie/preview"
        noFooter
        noCam
        noProgress
      >
        <div className="body-success">
          {RESPONSE.resolution === "APPROVAL" ? (
            <>
              <div className="completed">
                <img src={Person} alt="person" />
                <h3>
                  ¡{RESPONSE.name}, hemos validado su identidad correctamente!
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
                /* onClick={() => {
          validation();
        }} */
              >
                Siguiente
              </Button>
            </>
          ) : (
            <>
              <div className="succeed">
                <img src={BlueCheck} alt="BlueCheck" />
                <h3>¡{RESPONSE.name}, hemos recibido su solicitud!</h3>
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
                /* onClick={() => {
          validation();
        }} */
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
